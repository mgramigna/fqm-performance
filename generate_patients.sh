#!/bin/bash

cd ./synthea

echo "> Generating EXM104 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_104-8.2.000 -a 19-21 -p $1 -m stroke_exm_104_r4*

echo "> Generating EXM105 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_105-8.2.000/ --ecqm.measurementPeriodStart=2019-01-01T00:00:00Z -a 19-21 -p $1 -m stroke_exm_105_r4*

echo "> Generating EXM111 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_111-9.1.000/ -p $1 --ecqm.measurementPeriodStart=2019-01-01T00:00:00Z -m EXM111*

echo "> Generating EXM124 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_124-9.0.000 --ecqm.measurementPeriodStart=2019-01-01T00:00:00Z -a 52-52 -g F -p $1 -m breast_cancer_exm124-r4*

echo "> Generating EXM125 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_125-7.3.000/ --ecqm.measurementPeriodStart=2019-01-01T00:00:00Z -a 53-55 -g F -p $1 -m EXM125*

echo "> Generating EXM130 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_130-7.3.000/ --ecqm.measurementPeriodStart=2019-01-01T00:00:00Z -a 51-61 --exporter.years_of_history=11 -p $1 -m EXM130*

echo "> Generating EXM506 patients"
./run_synthea --exporter.fhir.export=true --exporter.fhir_stu3.export=false --exporter.baseDirectory=../patients/EXM_506-2.2.000/ -p $1 --ecqm.measurementPeriodStart=2019-01-01T00:00:00Z -m EXM506*

echo "Done"
