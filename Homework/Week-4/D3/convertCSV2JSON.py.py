# http://stackoverflow.com/questions/19697846/python-csv-to-json
# modified it only slightly
# auteur: Jasper Lelijveld
# studentnummer: 11401753
# vak: Data Processing

import csv
import json

# input/output files
csvfile = open('Barchart.csv', 'r')
jsonfile = open('Barchart.json', 'w')

# define fieldnames
fieldnames = ("Maand", "Neerslag")
reader = csv.DictReader(csvfile, fieldnames)
# for each csv row dump json row
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',')
    #remove last , in output

# close files
csvfile.close()
jsonfile.close()
