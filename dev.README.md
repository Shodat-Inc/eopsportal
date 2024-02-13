1. Important points to remember in eopsWatch flow
2. If searched with serialId, no other search will work.
3. The next flow is all about the showing the object values of class and subclass.

Doubts

1. What type of data will be stored in Crack Detection, Part Detection and workplace Safety detection
2. Relation with existing Class object Models
3. schema Design for part detection and workplace safety Detection what type of file structure will be stored

# Explanation of Schema:-

1. So in this schema we can see 4 tables
2. 1st table is for class (we didnt mention all the fields, just for basic understanding)
3. 2nd table is for object Which will have classID
4. 3rd table is for the object Value which will hold the values of objects of class, (why we seperated it just for saving values because there can be multiple values and instead of saving these into json we kept a seperate table for just to save the values only)
5. Now the 4th table is for ML Models.
6. As per my understanding , the ml Model will have the Values of objects only.
7. So we have kept the ojectValueId(For object 1 there can be 4 Ml model and for objectValue 2 there can be another model)
8. i want to make sure if this is the right approach or am i getting things in wrong way
9. And for every ML model we will have images which are in Azure block storage

## Tommorow updates

1. I've created 4 APIs regarding eops watch flow.As the APIs which will bring class and object data from the table. Now the API Create Model will be triggered to create new entry for the Models.And for showing the models for selected class and object , get Model Api is also created .

Now for the ETL Engineer, i have created an API which he will use to make entry in database in such a way that he will have access for this API and now only we have to give him info and moreover he will have urls of image .

The third API IS FOR GETTING ALL MODEL DATA FOR CLASSID

## response for tyre Detection :-->{

distance: int,
uom : string,
recomendation: "severe , moderate, no",
}

##

We have to send ModelID instead of name.


Flow Changes :-

# Api routes

## Login :-

Inv User :- api/login user UID role :-
Ent User:- api/login Ent UId EntID Role :-

Result :- Single API Route


## Class Creation :-

Result :- Single API Route

Validation :- For enterprise :- enterpriseID  For Individual :- uID

