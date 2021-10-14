"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = null
  searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  if (searchType === null){
    window.location.href = "index.html"
  }else{
    searchType.toLowerCase();
  }

  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let singleOrMultipleTrait = parseInt(prompt('1 - Search single trait' + '\n' + '2 - Search muliple traits'))
       if (singleOrMultipleTrait === 1 ){
        searchResults = whichTrait(people)
       }
       else{
        searchResults = multipleTraits(people)
       }
    break;
    case null:
      window.location.href = "index.html"
      default:
        window.location.href = "index.html"; // restart app
      break;
  }


  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
let answer = false
  if(person.length === 0){
    alert("Could not find that individual.");
    return window.location.href = "index.html"//app(people); // restart
  }

  if (person.length > 1){
    
    let resultArray = displayPeople(person);

    let question = promptFor("Do you want to go through list 1 by 1? Enter 'yes' or 'no'", yesNo).toLowerCase();
   if (question === 'yes'){   

    for(let i=0;i<person.length;i++){
      
      
  let displayOption = promptFor("Found " + person[i].firstName + " " + person[i].lastName + " . Please choose what you would like to see \n 1 - info \n 2 - family \n 3 - descendants\nType the number you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "1":
      let singleResult = displayPerson(person, i)
      //displayPerson(resultArray)
    break;
    case "2":
      searchByFamily(person, people)
    break;
    case "3":
      searchForGrandKs(person, people)
    break;
    case "restart":
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
  return window.location.href = "index.html"
    }}
    else{    
    
    app(people)
    }
  }
  else{

  
  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Please choose what you would like to see \n 1 - info \n 2 - family \n 3 - descendants\nType the number you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "1":
      let singleResult = displayPerson(person, 0)
      //displayPerson(resultArray)
    break;
    case "2":
      searchByFamily(person, people)

    break;
    case "3":
      searchForGrandKs(person, people)
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
  


  let triatOptions = parseInt(promptFor('Please choose which triat to search for:' + '\n' + '1 - Eye Color'+ '\n' + '2 - Gender'+ '\n' + '3 - Height'+ '\n' + '4 - Weight'+ '\n' + '5 - Occupation' + '\n'  +'0 - To complete search' , autoValid))
  
  if (triatOptions != 0 || triatOptions === 1 || triatOptions === 2 || triatOptions === 3 || triatOptions === 4 || triatOptions === 5 )
  {
          traits.push(triatOptions)
            choiceTraits()
          
          }
      else if (triatOptions ===0)
          return traits
      
      else
      {
        
          alert("Please start over! Only choose one of the options from the list")
          traits =[]
          choiceTraits();
          
      }
   return traits
}

function multipleTraits(people){
  
  let chooseTrait = choiceTraits()
   let searchResults = people
  for(let i=0;i<chooseTrait.length; i++){
        
    switch(chooseTrait[i]){
          case 1:
            searchResults = searchByEyeColor( searchResults)
          break;
          case 2:
            searchResults = searchByGender( searchResults)
          break;
          case 3:
            searchResults =  searchByHeight( searchResults)
          break;
          case 4:
            searchResults =  searchByWeight( searchResults)
          break;
          case 5:
            searchResults =  searchByParents(searchResults)
          break;
          case 6:
            searchResults = searchByCurrentSpouse(people)
          break;
          default:
      alert("Please choose one of the options from the list")
      multipleTraits(people,traits);
      break;
    }
}
// if (searchResults.length === 0){
// alert('No results found!')}

 return searchResults
}

function whichTrait(people){
 
  
  
      let choiceTrait = parseInt(prompt('Please choose which triat to search for:' + '\n' + '1 - Eye Color'+ '\n' + '2 - Gender'+ '\n' + '3 - Height'+ '\n' + '4 - Weight'+ '\n' + '5 - Parents' + '\n' + '6 - Current Spouse'))
        
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
          default:
      alert("Please choose one of the options from the list")
      whichTrait(people);
      break;
        }
        return searchResults
     
}

//Function used to search through an array of people to find matching above or below a users defined height  and return an array.

function searchByHeight(people)
{
  let heightType = parseInt(promptFor('What do you want to search for:' +'\n' +' 1 - Search Below height' +'\n'+ '2 - Above this height ',autoValid))
  let heightAmount = ""
  let searchResults

    if (heightType === 1)
    {
      heightAmount = parseInt(promptFor('Please enter the height in inches to search below:',autoValid))
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
      heightAmount = parseInt(promptFor('Please enter the height in inches to search above:',autoValid))
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
  let firstNameInput = promptFor("What is the person's first name?", autoValid);
  let lastNameInput = promptFor("What is the person's last name?", autoValid);

  
  let firstName = firstNameInput.charAt(0).toUpperCase() + firstNameInput.slice(1);
  let lastName = lastNameInput.charAt(0).toUpperCase() + lastNameInput.slice(1);

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
  
  let eyeColor = prompt('Please choose an eye color to search for:' + '\n' + '1 - Blue'+ '\n' + '2 - Hazel'+ '\n' + '3 - Black'+ '\n' + '4 - Green'+ '\n' + '5 - Brown');
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
    default:
      alert("Please choose one of the options from the list")
      searchByEyeColor(people);
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
  let weightType = parseInt(promptFor('What do you want to search for:' +'\n' +' 1 - Search people weighing below amount:' +'\n'+ '2 - Search people weighing above amount: ',autoValid))
  let weightAmount = ""
  let searchResults

    if (weightType === 1)
    {
      weightAmount = parseInt(promptFor('Please enter the weight to search below:',autoValid))
      let foundPerson = people.filter(function(potentialMatch){
      if (potentialMatch.height <= weightAmount)
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
      weightAmount = parseInt(promptFor('Please enter the weight to search above:',autoValid))
      let foundPerson = people.filter(function(potentialMatch)
      {
        if (potentialMatch.height >= weightAmount)
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





function searchByFamily(person, people){
  let foundFamily= people.filter(function(potentialMatch){

    if((person[0].id != potentialMatch.id && person[0].id === potentialMatch.parents[0]) || (person[0].id != potentialMatch.id && person[0].id === potentialMatch.parents[1]) || 
      (person[0].id != potentialMatch.id && person[0].parents[0] === potentialMatch.id) || (person[0].id != potentialMatch.id && 
       person[0].id === potentialMatch.currentSpouse) || person[0].id != potentialMatch.id && person[0].parents[0] === potentialMatch.parents[0]){
      return true;
    }
    else{
      return false;
    }
  })
 displayFamily(person, foundFamily)
  
}

function searchForGrandKs(person, people){
 
  let foundKids= people.filter(function(potentialMatch){
    if(person[0].id === potentialMatch.parents[0] || person[0].id === potentialMatch.parents[1]){

   return true;
  }
  })
  foundKids
displayPeople(foundKids)

  
}






// alerts a list of people
function displayPeople(people){
  
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + " "+  person.gender  + " " + ' ' + person.dob + ' ' + person.height +"inches" + " "+  person.weight +"  " + person.eyeColor + " "+  person.occupation
   }).join("\n"));
}


function displayPerson(person, index){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
 
  
  let personInfo = "First Name: " + person[index].firstName + "\n";
  personInfo += "Last Name: " + person[index].lastName + "\n";
  personInfo += "Gender " + person[index].gender + "\n";
  personInfo += "Date of Birth " + person[index].dob + "\n";
  personInfo += "Height " + person[index].height + "\n";
  personInfo += "Weight " + person[index].weight + "\n";
  personInfo += "Eye Color " + person[index].eyeColor + "\n";
  personInfo += "Occupation " + person[index].occupation + "\n";
      // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question)
      if (response != null)
      {
        response.trim()
      
       isValid = valid(response);
  }
  else{
    window.location.href = "index.html"
  }
}
      while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else if(input === null){
    window.location.href = "index.html"
  }else{  
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


