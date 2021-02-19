const fs = require('fs');
const path = require('path');
const { Calculator } = require('fqm-execution');
const axios = require('axios');
const _ = require('lodash');

(async () => {
  const NS_PER_SEC = 1e9;
  const fpgbasePath = './fhir-patient-generator';
  const cthonBasePath = './connectathon/fhir401/bundles/measure';
  const fpgMeasureDirs = fs
    .readdirSync('./fhir-patient-generator')
    .filter(item => !/(^|\/)\.[^/.]/g.test(item))
    .filter(fd => fs.lstatSync(path.join(fpgbasePath, fd)).isDirectory());

  const patientCounts = [1, 10, 100, 1000, 2500];

  let csv = `measure,${patientCounts
    .map(c => `${c} patient(s) with cli (seconds),${c} patient(s) with http service (seconds)`)
    .join(',')}`;

  csv += '\n';

  for (const dir of fpgMeasureDirs) {
    const p = path.join('./patients', dir);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p, { recursive: true });
    }

    const cthonMeasureString = dir.replace('_', '');
    const cthonMeasureBasePath = path.join(cthonBasePath, cthonMeasureString);
    const cthonBundlePath = path.join(cthonMeasureBasePath, `${cthonMeasureString}-bundle.json`);
    const measureBundle = JSON.parse(fs.readFileSync(cthonBundlePath, 'utf8'));

    const patientBundlesBasePath = `./patients/${dir}/fhir`;

    console.log(`Parsing patient bundles for ${dir}`);
    const patientBundles = fs
      .readdirSync(patientBundlesBasePath)
      .slice(0, _.max(patientCounts))
      .map(f => JSON.parse(fs.readFileSync(path.join(patientBundlesBasePath, f), 'utf8')));

    let csvEntry = `${cthonMeasureString}`;
    for (const count of patientCounts) {
      const slicedPatients = patientBundles.slice(0, count);

      console.log(`--- TIMING ${dir} with ${slicedPatients.length} patient(s) ---`);
      let time = process.hrtime();
      Calculator.calculate(measureBundle, slicedPatients, {});
      let diff = process.hrtime(time);

      const cliTimeDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;

      time = process.hrtime();
      try {
        if (!(cthonMeasureString.includes('EXM111') && count > 1000))
          await axios.post(
            'http://localhost:3000/calculate',
            {
              measure: measureBundle,
              patients: slicedPatients
            },

            {
              maxBodyLength: 10000000000
            }
          );
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }

      diff = process.hrtime(time);
      const httpTimeDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;

      console.log(`${dir} took ${cliTimeDiff} seconds using fqm-execution cli`);
      console.log(`${dir} took ${httpTimeDiff} seconds using fqm-execution-service`);
      console.log(`------\n\n`);

      csvEntry += `,${cliTimeDiff},${httpTimeDiff}`;
    }

    csv += `${csvEntry}\n`;
  }

  console.log(csv);

  fs.writeFileSync('performance.csv', csv, 'utf8');
})();
