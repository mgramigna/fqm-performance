#!/bin/bash

echo "> Cloning connectathon"
git clone https://github.com/dbcg/connectathon

echo "> Cloning fhir-patient-generator"
git clone https://github.com/projecttacoma/fhir-patient-generator

echo "> Cloning synthea"
git clone https://github.com/projecttacoma/synthea

echo "> Creating output directories"
mkdir -p patients/EXM_104-8.2.000 patients/EXM_105-8.2.000 patients/EXM_111-9.1.000 patients/EXM_124-9.0.000 patients/EXM_125-7.3.000 patients/EXM_130-7.3.000 patients/EXM_506-2.2.000

echo "> Done"
