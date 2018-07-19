## [Try it here](https://zonkooo.github.io/perunames/)

# Why ?
Visiting Peru, I had a very hard time memorizing city names because thay all seem to sound the same. So I decided to write a generator of Peruvian city names.

# How ?
I downloaded a map of Peru from [geofabrik](https://download.geofabrik.de/south-america.html) so I could extract the names of all cities from it
Then, I was too lazy to parse the xml, so I just used grep to get:
* tags "name" near tags v="town"
* tags v="addr:district"
* tags v="addr:subdistrict"
* tags v="addr:city"
	
I put all this in a single file, cleaned the data with some regex search/replace, like for instance:
* replaced ';' with line breaks
* removed characters that are not letters
* removed all "San *" and "Santa *" from the list because the aim is to generate names that look Quechuan

...and unduplicated entries

From this list, I get the probabilities to go from one letter to another, and use those probabilities to re-generate names :)
