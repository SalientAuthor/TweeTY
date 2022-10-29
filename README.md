# Tweety
 checkout Working Model  : http://twittersentimentanalysisign.herokuapp.com 
## Topics to be covered:

- Introduction.

- Technologies Used.

- Working.

- Motivation.

- Collaborators
  
---

### Introduction

**Tweety** is a Web Based Application for Twitter Sentiment Analysis. It uses the _Twitter API, Python, Angular, Node_ to build a complete web application for the above purpose. The detailed working can be read in the working section.

---

### Technologies Used

**Major Technologies:**

|Python (3.9)|Node (14 LTS)|MongoDB Atlas |Twitter API|
|:-:|:-:|:-:|:-:|

**Libraries:**

|Library| Version| Technology|
|:-:|:-:|:-:|
|Django|3.1.7|Python|
|NLTK|3.6.2|Python|
|Tweepy|3.10.0|Python|
|Angular|11.2.9|Node|
|Express JS|4.17.1|Node|
|Mongoose|5.12.5|Node|
|Typescript|4.1.5|Node|

---

### Components & Working 

**Components:**

The complete web application is divided in three section:

_1. Twitter API and Python Backend_
- We use Tweepy Python Package for communicating with the Twitter API for authentication & retrieval of tweets.

- Cleaning the tweets, and generating _Sentiments_ data using the regex python module and _NLTK_ python Package respectively.

- Building a _REST API_ using _Django_ so users can fetch the results to a particular query by AJAX calls.

_2. Express JS Backend_
- For _MongoDB Atlas_ Database for user authentication and search results saving. Note that an extra Backend is used for the purpose of fast database access.

_3. Angular Front-end Application_
- Using _Angular_ we built a frontend application served by the _Express Server_ for providing the User Interface for Sentiment Analysis, Authentication, etc.
  
**Working:**

- Obtain four _Twitter authentication keys_ for communication with the _Twitter API._

- Using _Tweepy_ we connect with with Twitter API and obtain tweets.

- Using _Regex_ we clean the tweets.

-  _Sentiment Analysis_ using _NLTK_ Python Package.

-  _Restful API_ using _Django_ to fetch sentiment analysis results over HTTP.

-  _Express JS_ server for *User Authentication, Front-end Application Deployment*.

-  _Angular_ application to build UI for Sentiment Analysis search, User Authentication, and saving search results.

---

### Motivation
> The Goal is to turn data in information, and information into insight.
-- <cite>Carly Florina</cite>

Our motivation was purely based on the this notion of deep understanding of information gained by processing user generated data on social media platforms to let the world know what people think of a particular topic, people who are separated by thousands of miles of distance yet understand their feeling without even communicating with them.

---

### Contributors
<a href="https://github.com/SalientAuthor/TweeTY/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SalientAuthor/TweeTY"/> 
</a> 


																			
	
