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
      searchResults = whichTrait(people)
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

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      
      displayPeople(person)
      app(people)
     //displayPerson(resultArray)
    break;
    case "family":
    // TODO: get person's family
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

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

function whichTrait(people){
  let choiceTrait = prompt('Please choose which triat to search for:' + '\n' + '1 - Eye Color'+ '\n' + '2 - Gender'+ '\n' + '3 - Height'+ '\n' + '4 - Weight'+ '\n' + '5 - Parents' + '\n' + '6 - Current Spouse' )
    
  let searchResults
  switch(choiceTrait){
      case "1":
       searchByEyeColor(people)
      break;
      case "2":
        searchResults = searchByGender(people)
        
      break;
      case "3":
        searchByHeight(peolpe)
      break;
      case "4":
        searchByWeight(people)
      break;
      case "5":
        searchByParents(people)
      break;
      case '6':
        searchByCurrentSpouse(people)
      break;
        
    }
    return searchResults
  }

function searchByHeight(people)
{
  let heightType = parseInt(prompt('What do you want to search for:' +'\n' +' 1 - Search Below height' +'\n'+ '2 - Above this height '))
  let heightAmount
  let heightBelow = (people <= heightAmount);
  let heightAbove = (people >= heightAmount)
    if (heightType === '1')
    {
      heightAmount = parseInt(prompt('Please enter the height in inches to search below:'))
      let foundPerson = people.filter(function(heightBelow)
      {
        return foundPerson;
      })
    }

    else{
      heightAmount = parseInt(prompt('Please enter the height in inches to search above:'))
      let foundPerson = people.filter(function(potentialMatch, heightAbove)
      {
        return foundPerson;
      })
    }
}

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
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
  return  foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  
  let eyeColor = promptFor('Please choose an eye color to search for:' + '\n' + '1 - Blue'+ '\n' + '2 - Hazel'+ '\n' + '3 - Black'+ '\n' + '4 - Green'+ '\n' + '5 - Brown', autoValid);
  
  switch(eyeColor){
    case "1":
      let eyeColorBlue = people.filter(function(potentialMatch){
        if (potentialMatch.eyeColor === 'blue')
      return eyeColor})
    break;
    case "2":
      let eyeColorHazel = people.filter(function(eyeColor = Hazel){
        return eyeColorHazel})
    break;
    case "3":
      let eyeColorBlack = people.filter(function(potentialMatch){
        return eyeColorBlack})
    break;
    case "4":
      let eyeColorGreen = people.filter(function(potentialMatch){
      return eyeColorGreen})
    break;
    case "family":
      let eyeColorBrown = people.filter(function(potentialMatch){
        return eyeColorBrown})
    break;
      
  }
  return eyeColor
  console.log(eyeColor)
}
  


//Gender Function
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



//Weight Function
function searchByWeight(people){
  let weight= promptFor("how much does the person weight?", autoValid)
  
  let weightFound= people.filter(function(potentialMatch){
    if(potentialMatch.weight === weight){
      return true;
    }
    else{return false;
    }
  })
  return weightFound
}



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + " "+  person.gender  + " " + person.height +"inches" + ' ' + person.dob + " "+  person.occupation +"  " + person.eyeColor
   }).join("\n"));}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender " + person.gender + "\n";
  personInfo += "Height " + person.height + "\n";
  personInfo += "Weight " + person.weight + "\n";
  personInfo += "Age " + person.dob + "\n";
  personInfo += "Occupation " + person.occupation + "\n";
  personInfo += "Eye Color " + person.eyeColor + "\n";
  
  // TODO: finish getting the rest of the information to display.

  alert(personInfo);
  }


//#endregion



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