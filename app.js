"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let singleOrMultipleTrait = parseInt(prompt('1 - Search single trait' + '\n' + '2 - Search Muliple traits'))
       if (singleOrMultipleTrait === 1 ){
        searchResults = whichTrait(people)
       }
       else{
        searchResults = multipleTraits(people)
       }
       
      break;
      default:
    app(people); // restart app
      break;
  }


  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
let answer = false
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  if (person.length > 1){
    
    let resultArray = displayPeople(person);

    let question = promptFor("Do you want to go through list 1 by 1? Enter 'yes' or 'no'", yesNo).toLowerCase();
   if (question === 'yes'){   

    for(let i=0;i<person.length;i++){
      
      
  let displayOption = promptFor("Found " + person[i].firstName + " " + person[i].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      let singleResult = displayPerson(person)
      //displayPerson(resultArray)
    break;
    case "family":
      searchByFamily(person, people)
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
    }}
    else{    
    
    app(people)
    }
  }
  else{

  
  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      let singleResult = displayPerson(person)
      //displayPerson(resultArray)
    break;
    case "family":
    searchByFamily(person, people)
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 
let traits =[]  
function choiceTraits(){
  


  let triatOptions = parseInt(prompt('Please choose which triat to search for:' + '\n' + '1 - Eye Color'+ '\n' + '2 - Gender'+ '\n' + '3 - Height'+ '\n' + '4 - Weight'+ '\n' + '5 - Occupation' + '\n'  +'0 - To complete search' ))
    if (triatOptions != 0){
      traits.push(triatOptions)
        choiceTraits()
      
      }
    else{
      return false
    }
   return traits
}

function multipleTraits(people){
  
  let chooseTrait = choiceTraits()
   let searchResults
  for(let i=0;i<chooseTrait.length; i++){
        
    switch(chooseTrait[i]){
          case 1:
            searchResults = searchByEyeColor(people)
          break;
          case 2:
            searchResults = searchByGender(people)
          break;
          case 3:
            searchResults =  searchByHeight(people)
          break;
          case 4:
            searchResults =  searchByWeight(people)
          break;
          case 5:
            searchResults =  searchByParents(people)
          break;
          case 6:
            searchResults = searchByCurrentSpouse(people)
          break;
    }
}
 return searchResults
}

function whichTrait(people){
 
  
  
      let choiceTrait = parseInt(prompt('Please choose which triat to search for:' + '\n' + '1 - Eye Color'+ '\n' + '2 - Gender'+ '\n' + '3 - Height'+ '\n' + '4 - Weight'+ '\n' + '5 - Parents' + '\n' + '6 - Current Spouse' ))
        
      let searchResults
      switch(choiceTrait){
          case 1:
            searchResults = searchByEyeColor(people)
          break;
          case 2:
            searchResults = searchByGender(people)
          break;
          case 3:
            searchResults =  searchByHeight(people)
          break;
          case 4:
            searchResults =  searchByWeight(people)
          break;
          case 5:
            searchResults =  searchByParents(people)
          break;
          case 6:
            searchResults = searchByCurrentSpouse(people)
          break;
            
        }
        return searchResults
     
}

//Function used to search through an array of people to find matching above or below a users defined height  and return an array.

function searchByHeight(people)
{
  let heightType = parseInt(prompt('What do you want to search for:' +'\n' +' 1 - Search Below height' +'\n'+ '2 - Above this height '))
  let heightAmount = ""
  let searchResults

    if (heightType === 1)
    {
      heightAmount = parseInt(prompt('Please enter the height in inches to search below:'))
      let foundPerson = people.filter(function(potentialMatch){
      if (potentialMatch.height <= heightAmount)
      {
        return true;
      }
      else{
        return false;
      }
             
       ;
      })
      searchResults = foundPerson
    }

    else{
      heightAmount = parseInt(prompt('Please enter the height in inches to search above:'))
      let foundPerson = people.filter(function(potentialMatch)
      {
        if (potentialMatch.height >= heightAmount)
        {
          return true;
        }
        else{
          return false;
        }
                  
         ;
        })
      searchResults = foundPerson
    }

    return searchResults
}

//Function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
            return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

////Function used to search through an array of people to find matching users defined eye color and return an array.

function searchByEyeColor(people){
  
  let eyeColor = promptFor('Please choose an eye color to search for:' + '\n' + '1 - Blue'+ '\n' + '2 - Hazel'+ '\n' + '3 - Black'+ '\n' + '4 - Green'+ '\n' + '5 - Brown', autoValid);
  let searchResults 
  switch(eyeColor){
    case "1":
      let eyeColorBlue = people.filter(function(potentialMatch){
        if (potentialMatch.eyeColor === 'blue')
        {
          return true;
        }
        else{
          return false;
        }
          })
      searchResults = eyeColorBlue
    break;
    case "2":
      let eyeColorHazel = people.filter(function(potentialMatch){
        if (potentialMatch.eyeColor === 'hazel'){
          return true;
        }
        else{
          return false;
        }
      })
      searchResults = eyeColorHazel
    break;
    case "3":
      let eyeColorBlack = people.filter(function(potentialMatch){
        if (potentialMatch.eyeColor === 'black'){
          return true;
        }
        else{
          return false;
        }
      })
      searchResults = eyeColorBlack
    break;
    case "4":
      let eyeColorGreen = people.filter(function(potentialMatch){
        if (potentialMatch.eyeColor === 'green'){
          return true;
        }
        else{
          return false;
        }
      })
      searchResults = eyeColorGreen
    break;
    case "5":
      let eyeColorBrown = people.filter(function(potentialMatch){
        if (potentialMatch.eyeColor === 'brown'){
          return true;
        }
        else{
          return false;
        }
      })
      searchResults = eyeColorBrown
    break;
      
  }
  return searchResults
  
}
  


////Function used to search through an array of people to find matching users defined gender and return an array.
function searchByGender(people){
  let gender = promptFor("what is the person's gender?", autoValid);

  let foundGender= people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return foundGender;
}



//Function used to search through an array of people to find matching users defined weight and return an array.
function searchByWeight(people){
  let weight= parseInt(promptFor("how much does the person weight?", autoValid))
  
  let weightFound= people.filter(function(potentialMatch){
    if(potentialMatch.weight === weight){
      return true;
    }
    else{return false;
    }
  })
  return weightFound
}

//Search Family Function
function searchByFamily(person, people){
  
  let foundFamily= people.filter(function(potentialMatch){
   
    if(potentialMatch.parents[0] === person[0].id || potentialMatch.parents[1] === person[0].id || potentialMatch.currentSpouse === person[0].id){
      return true;
    }
    else{return false;
    }
  
  })


  displayPeople(foundFamily)
}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 




// alerts a list of people
function displayPeople(people){
  
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + " "+  person.gender  + " " + ' ' + person.dob + ' ' + person.height +"inches" + " "+  person.weight +"  " + person.eyeColor + " "+  person.occupation
   }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
 
  
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender " + person[0].gender + "\n";
  personInfo += "Date of Birth " + person[0].dob + "\n";
  personInfo += "Height " + person[0].height + "\n";
  personInfo += "Weight " + person[0].weight + "\n";
  personInfo += "Eye Color " + person[0].eyeColor + "\n";
  personInfo += "Occupation " + person[0].occupation + "\n";
      // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}


//#endregion

// hello

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 
// ---------- let  response = promptFor('Do you like blue? yes or no', yesNo) ------ example
//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  return input;
  
}

//#endregion