## Version and project info

The code has been tested on both develop and production mode in gatsby and has been verified to work the same. One important thing to note is that gatsby has many issues in different versions. Therefore the following versions are the only ones to be guaranteed to work.

- Gatsby CLI version: 2.15.1
- Gatsby version: 2.28.2

## Additions to the original spacy course framwork

- Responsive web design

The whole website is now fully responsive and also has hamburger.

- Tasks has been introduced. 

Task funtionality has beed added with many related componentes. From the start there was only a single-choice question type compared to current state where about 10 more has beed added. One major improvement has also been the Introducement of input types and also for example a video component.

- Unrelated functionality has been stripped or reworked.

While we have kept some currently not in use code much of the original codebase has been reworked. 

## How to create new components

To create new components and question types what is important is that new components follow the same structure as current ones. 

- A submit button with logic that handles a answer check with corresponding logic. 

- A new entry is created in the markdown.js file for this component.

- If info about the answer is wanted behavior that the handles needs to be  passed to AnswerInfo which also verifies the data to provide the right answer info. There are several optional arguments to answer info which defines what text to use at which answer. 


## Design choices

### Coherent design 

The strive has been to create a coherent codebase where it is easy to find what diffent parts of code. The page code consists of components which can can also be of type answer-types which more explicity mean an excersise task where the user does an action with in return gets corrected. Apart from this we also have  `tasks` which are easy add, create and modify.

<br>

### Task fundamentalism

The idea of the the framework being a `task framework` is rather strict. However, the meaning of this is yet somewhat abstract. A `task` can be defined a page where a user should do an action. While mostly excersise types of componets has been created, there is nothing that stops other types of components from being created and used in a `task`. An example is the video component. 

<br>

### Simplified processes

Some goals have been to be able to easily create more tasks, introduce new task types and components and also for the user to have a good experience of while visiting and using the page. However, if the framework grows much bigger a redesign of the folder structure should be needed to be able to keep a easy to use structure. For example, tasks should be abe to exist in folders and not be forced to be in the `tasks` folder.  

<br>

### Dark mode

A was added since this is a modern and largely requsted feature from many web users. Together with sass it is easy to define what colors to use in dark mode and non dark mode. A variable has to be added in both sections in the theme.js file and this variable should the be used in the sass file corresponded to the component. The themechanger.js component is responsible for the dark mode. 