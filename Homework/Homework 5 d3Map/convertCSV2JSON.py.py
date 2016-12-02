# http://stackoverflow.com/questions/34785099/python-csv-to-json-using-column-as-key# modified it only slightly
# auteur: Jasper Lelijveld
# studentnummer: 11401753
# vak: Data Processing

import csv
import json

# input/output files
csvfile = open('DataCountries.csv', 'r')
jsonfile = open('DataCountries.json', 'w')

# define fieldnames
fieldnames = ("code", "name", "population", "percentage")
reader = csv.DictReader(csvfile, fieldnames)
# for each csv row dump json row
for row in reader:
    json.dump({row['code'] : ('{name: ', row['name'], 'population: ', row['population'],'percentage: ', row['percentage'])}, jsonfile)
    jsonfile.write(',\n')
    #remove last , in output
    # add formatting in JSON file if > 1 array of data

# close files
csvfile.close()
jsonfile.close()
