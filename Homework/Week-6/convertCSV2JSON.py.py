# http://stackoverflow.com/questions/19697846/python-csv-to-json
# modified it only slightly
# auteur: Jasper Lelijveld
# studentnummer: 11401753
# vak: Data Processing

import csv
import json

# input/output files
csvfile = open('Data.csv', 'r')
jsonfile = open('Data.json', 'w')

# define fieldnames
fieldnames = ("Datum", "GemiddeldeTemperatuur", "MinimumTemperatuur", "MaximumTemperatuur")
reader = csv.DictReader(csvfile, fieldnames)
# for each csv row dump json row
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',')
    #remove last , in output
    # add formatting in JSON file if > 1 array of data

# close files
csvfile.close()
jsonfile.close()
