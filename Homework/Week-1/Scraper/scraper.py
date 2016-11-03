#!/usr/bin/env python
# Name:             Jasper Lelijveld
# Student number:   11401753
# Ouput csv file should be opened with ; as separator for columns and " as separator for text! Works perfectly
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext, strip_between


TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# dom as input, amount of repetitions as output
def repeater(rep):
    return rep.by_class("lister-current-last-item")[0]

# dom and repeat as input, list of titles on dom as output
def get_title(a, e):
    b = a.by_class("lister-item-header")[e].by_tag("a")[0].content.encode("ascii", "ignore")
    return b

# dom and repeat as input, list of ratings on dom as output
def get_rating(a, e):
    b = a.by_class("inline-block ratings-imdb-rating")[e].by_tag("strong")[0].content.encode("ascii", "ignore")
    return b

# dom and repeat as input, list of genre on dom as output
def get_genre(a, e):
    b = a.by_class("lister-item-content")[e].by_class("genre")[0].content.encode("ascii", "ignore")
    b = b.rstrip()
    return b

# dom and repeat as input, list of strings containing actors of each tv series on dom as output
def get_actors(a, e):
    d = 0
    actor_list = ""
    while True:
        try:
            temp = a.by_class("lister-item-content")[e].by_tag("p")[2].by_tag("a")[d].content.encode("ascii", "ignore")
            actor_list += temp + ", "
            d += 1
        except IndexError:
            break
    return actor_list

# dom and repeat as input, list of runtime on dom as output
def get_runtime(a, e):
    return a.by_class("lister-item-content")[e].by_class("runtime")[0].content.encode("ascii", "ignore")

# overarching extract method, returns list containing lists (2d array)
def extract_tvseries(dom, i):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    title = []
    rating = []
    genre = []
    actors = []
    runtime = []
    complete = []
    e = 0
    while e < i:
        try:
            title.append(get_title(dom, e))
            rating.append(get_rating(dom, e))
            genre.append(get_genre(dom, e))
            actors.append(get_actors(dom, e))
            runtime.append(get_runtime(dom, e))
            e += 1
        except IndexError:
            break
    complete.append(title)
    complete.append(rating)
    complete.append(genre)
    complete.append(actors)
    complete.append(runtime)
    return complete


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    for e in range(0, len(tvseries[0])):
        writer.writerow([tvseries[0][e], tvseries[1][e], tvseries[2][e], tvseries[3][e], tvseries[4][e]])


if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    repeat = repeater(dom)
    tvseries = extract_tvseries(dom, repeat)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)