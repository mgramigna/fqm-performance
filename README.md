A tool for evaluating the performance of [fqm-execution](https://github.com/projecttacoma/fqm-execution)


# Usage

## Clone dependent repos and create necessary directories

``` bash
./setup.sh
```

## Install dependencies and start fqm-execution-service

```
npm install
```

```
cd fqm-execution-serive && npm install
npm start
```

## Generate patients

From the root directory

``` bash
./generate_patients.sh x # replace x with number of patients you wish to create for each measure
```

## Performance evaluation

From the root directory (increasing javascript heap memory size)

```
node --max-old-space-size=8192 performance.js
```
