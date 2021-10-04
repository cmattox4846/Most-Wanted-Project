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
  if(!person){
    alert("Could not find that individual.");
    return window.location.href = "index.html"//app(people); // restart
  }

  if (person.length > 1){
    
    let resultArray = displayPeople(person);

    let question = promptFor("Do you want to go through list 1 by 1? Enter 'yes' or 'no'", yesNo).toLowerCase();
   if (question === 'yes'){   

    for(let i=0;i<person.length;i++){
      
      
  let displayOption = promptFor("Found " + person[i].firstName + " " + person[i].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      let singleResult = displayPerson(person, i)
      //displayPerson(resultArray)
    break;
    case "family":
      searchByFamily(person, people)
    break;
    case "descendants":

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
      let singleResult = displayPerson(person, 0)
      //displayPerson(resultArray)
    break;
    case "family":
   familySearch(person, people)

    break;
    case "descendants":
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
  
  if (triatOptions != 0 && triatOptions === 1 || triatOptions === 2 || triatOptions === 3 || triatOptions === 4 || triatOptions === 5 || triatOptions === 0 )
  {
          traits.push(triatOptions)
            choiceTraits()
          
          }
      else
      {
        
          alert("Please start over! Only choose one of the options from the list")
          triats =[]
          choiceTraits();
          
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
          default:
      alert("Please choose one of the options from the list")
      multipleTraits(people,traits);
      break;
    }
}
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
<<<<<<< HEAD
let foundParents= []

//Search Family Function
// function searchByFamily(person, people){
  
//   // let foundParents= people.filter(function(potentialMatch){
//     //added to test if this will walk through array of people
    
//     if(person[0].parents != null){ 
//       foundParents.push(person[0].parents)
//       // foundParents.push(person[0].parents[1])
//       }
//     else{return false;
//     }
//     let parentsName= people.filter(function(potentialMatch){
//       for(let i=0; i<foundParents.length; i++){     
//       if(potentialMatch.id === foundParents[i]){ 
//         return true;
//       }
//       else{return false;
//       }
//         }
//       })
  
  
//   let foundSpouse= people.filter(function(potentialMatch){
//     //added to test if this will walk through array of people
    
//     if(potentialMatch.currentSpouse === person[0].id){ 
//       return true;
//     }
//     else{return false;
//     }
//       })

//   let foundSiblings= people.filter(function(potentialMatch){
//     //added to test if this will walk through array of people
    
//     if(potentialMatch.parents[0] === person[0].parents[0] || potentialMatch.parents[1] === person[0].parents[1]){ 
//       return true;
//     }
//     else{return false;
//     }
//       })
  
    
//  alert(person[0] + "'s parents are " +  parentsName + "\n" + "Spouse is " + foundSpouse[0] + "\n" + "Siblings are " + foundSiblings)
// }


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

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 



=======
>>>>>>> ec78402569eec4ee777ab46d9e38b1776df5b7bd

// alerts a list of people
function displayPeople(people){
  
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + " "+  person.gender  + " " + ' ' + person.dob + ' ' + person.height +"inches" + " "+  person.weight +"  " + person.eyeColor + " "+  person.occupation
   }).join("\n"));
}

<<<<<<< HEAD
//New family dispaly function
//Almost working, just needs to get the values of the family to show up in the someArray arguement as its passing through the if Statement.

function displayFamily(person, someArray){
let parent= []
let spouse= []
let siblings=[]
someArray
 
    for(let i=0;i<someArray.length; i++){
      someArray[i]
//for parent
    if(person[0].parents[0] === someArray[i].id || person[0].parents[1] === someArray[i].id){
    let parentalFigure= someArray[i].firstName + " " + someArray[i].lastName
    parent= parentalFigure
   }


//spouse
    else if(person[0].id === someArray[i].currentSpouse){
    let foundSpouse = someArray[i].firstName + " " + someArray[i].lastName
    spouse= foundSpouse
    }


//siblings
    else if(person[0].parents[0] === someArray[i].parents[0] || person[0].id === someArray[i].parents[1]){
    let kids= someArray[i].firstName + " " + someArray[i].lastName + " "
    siblings.push(kids)
    }
  }
alert(`The parents are ${parent}\n The spouse ${spouse}\n the siblings are ${siblings}`)
}








function displayPerson(person,index){
=======

function displayPerson(person, index){
>>>>>>> ec78402569eec4ee777ab46d9e38b1776df5b7bd
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




//********** First Attempt at the family function
                                              //Search Family Function
                                              // function searchByFamily(person, people){
                                                
                                              //   // let foundParents= people.filter(function(potentialMatch){
                                              // //     //added to test if this will walk through array of people
                                                  
                                              //     if(person[0].parents != null){ 
                                              //        foundParent1 = toString(person[0].parents[0]);
                                              //        foundParent2 = toString(person[0].parents[1]);
                                                    
                                              //       //foundParents.push(person[0].parents)
                                              //       // foundParents.push(person[0].parents[1])
                                              //       }
                                              //     else
                                              //     {return false;
                                              //     }
                                              //     parentsName= people.filter(function(potentialMatch){
                                                    
                                              //      /// for(let i=0; i<foundParents.length; i++){     
                                              //       if(potentialMatch.id === foundParent1 || potentialMatch.id === foundParent2){ 
                                              //         return true;
                                              //       }
                                              //       else{return false;
                                              //       }
                                              //         }
                                              //     )
                                                
                                                
                                              //     foundSpouse = people.filter(function(potentialMatch){
                                              //     //added to test if this will walk through array of people
                                              //     if(person[0].currentSpouse != null){ 
                                              //     if(potentialMatch.currentSpouse === person[0].currentSpouse){ 
                                              //       return true;
                                              //     }
                                              //     else{return false;
                                              //     }
                                              //   }else{
                                              //     foundSpouse = 'No Spouse Found!'
                                                  
                                              //   }
                                              //       })

                                              //   let foundSiblings= people.filter(function(potentialMatch){
                                              //     //added to test if this will walk through array of people
                                              //     if(person[0].parents != null){ 
                                              //       foundParents.push(person[0].parents)
                                              //       // foundParents.push(person[0].parents[1])
                                              //       }
                                              //     else{return false;
                                              //     }
                                              //     let parentsName= people.filter(function(potentialMatch){
                                              //       for(let i=0; i<foundParents.length; i++){     
                                              //       if(potentialMatch.id === foundParents[i]){ 
                                              //         return true;
                                              //       }
                                              //       else{return false;
                                              //       }
                                              //         }
                                              //       })
                                                
                                                
                                              //   let foundSpouse= people.filter(function(potentialMatch){
                                              //     //added to test if this will walk through array of people
                                                  
                                              //     if(potentialMatch.currentSpouse === person[0].id){ 
                                              //       return true;
                                              //     }
                                              //     else{return false;
                                              //     }
                                              //       })

                                              //   let foundSiblings= people.filter(function(potentialMatch){
                                              //     //added to test if this will walk through array of people
                                                  
                                              //     if(potentialMatch.parents[0] === person[0].parents[0] || potentialMatch.parents[1] === person[0].parents[1]){ 
                                              //       return true;
                                              //     }
                                              //     else{return false;
                                              //     }
                                              //       })
                                                
                                                  
                                              //  alert(person[0] + "'s parents are " +  parentsName + "\n" + "Spouse is " + foundSpouse[0] + "\n" + "Siblings are " + foundSiblings)
                                              // }


                                              // function searchByFamily(person, people){
                                              //   let foundFamily= people.filter(function(potentialMatch){

                                              //     if(person[0].id === potentialMatch.parents[0] || person[0].id === potentialMatch.parents[1] ||person[0].parents[0] === potentialMatch.id ||  
                                              //        person[0].id === potentialMatch.currentSpouse || person[0].parents[0] === potentialMatch.parents[0]){
                                              //       return true;
                                              //     }
                                              //     else{
                                              //       return false;
                                              //     }
                                              //   })
                                              //  displayFamily(person, foundFamily)
                                                
                                                  
                                              //  alert(person[0] + "'s parents are " +  parentsName + "\n" + "Spouse is " + foundSpouse + "\n" + "Siblings are " + foundSiblings)
                                              // }

                                              // function searchForGrandKids(anArray, person){

                                              //   let foundEveryone= anArray.filter(function(potentionalMatch){
                                              //     if(potentialMatch.parents[0] === person[i].id || potentialMatch.parents[1] === person[i].id || potentialMatch.currentSpouse === person[i].id){
                                              //     return true;
                                              //   }
                                              //   else{return false;}

                                              //   })
                                              // return foundEveryone

                                              // }

                                              //#endregion

                                              //Display functions.
                                              //Functions for user interface.
                                              /////////////////////////////////////////////////////////////////
                                              //#region 






// //New family dispaly function
// ***************Option 1 Almost working, just needs to get the values of the family to show up in the someArray arguement as its passing through the if Statement.

                                      // function displayFamily(person, someArray){
                                      // let dad
                                      // let mom
                                      // let husband
                                      // let wife
                                      // let siblings
                                      // someArray
                                      //   person.map(function(person, someArray){
                                      //     for(let i=0;i<someArray.length; i++){
                                      //       someArray[i]
                                      // //for dad
                                      //     if(person[0].id === someArray[i].parents[0].id || person[0].id === someArray[i].parents[1] && someArray[i].gender === male){
                                      //     dad= someArray.firstName + " " + someArray.lastName
                                      //     return dad;
                                      //    }

                                      // //for mom
                                      //     else if(person[0].id === someArray[i].id || person[0].id === parents[1] && person[0].gender === female){
                                      //     mom= someArray.firstName + " " + someArray.lastName
                                      //     return mom;
                                      //     }

                                      // //husband
                                      //     else if(person[0].id === someArray[i].currentSpouse && person[0].gender === male){
                                      //     husband = someArray.firstName + " " + someArray.lastName
                                      //     return husband;
                                      //     }


                                      // //wife
                                      //     else if(person[0].id === someArray[i].currentSpouse && person[0].gender === female){
                                      //     wife = someArray.firstName + " " + someArray.lastName
                                      //     return wife;
                                      //     }

                                      // //siblings
                                      //     else if(parents[0].id === someArray[i].id || parents[1].id === someArray[i].id){
                                      //     siblings= someArray.firstName + " " + someArray.lastName
                                      //     return siblings;
                                      //     }
                                      //   }
                                      // alert(`the farther is ${dad}\n the mother is ${mom}\n the husband is ${husband}\n the wife is ${wife}\n the siblings are ${siblings}`)
                                      // })

// ********** Option 2  but cant figure out how to call the info correctly

                                      // function familySearch(person, people){
                                      // let siblings = siblingSearch(person,people)
                                      // let parents = parentSearch(person,people)
                                      // let spouse = spouseSearch(person,people)

                                      // displayFamily(person,siblings,parents,spouse)

                                      // }


                                      // function siblingSearch(person, people)
                                      // {
                                      //   let siblingResult = people.filter(function(potentialMatch)
                                      //   {
                                        
                                      //     if (person.parents[0] === potentialMatch.parents[0] ||person.parents[0] === potentialMatch.parents[1] ||person.parents[1] === potentialMatch.parents[0]  ||person.parents[1] === potentialMatch.parents[1])
                                      //         {
                                      //           return true
                                      //         }
                                      //         else
                                      //         {
                                      //           return false
                                      //         }

                                      //   })
                                      //   return siblingResult
                                      // }




                                      // function parentSearch(person, people)
                                      // {
                                      //   let parentidResult = people.filter(function(potentialMatch)
                                      //   {
                                      //     if (person.id === potentialMatch.id)
                                      //     {
                                      //       return person.parents
                                      //     }
                                      //     else
                                      //     {
                                      //       return false
                                      //     }
                                      //   })
                                      //   let parentResult = people.filter(function(potentialMatch)
                                      //   {
                                          
                                      //     for (let i = 0 ; i <parentidResult.length; i++){
                                      //     if (parentidResult[i] === potentialMatch.id)
                                      //     {
                                      //       return person.firstName +' ' + person.lastName
                                      //     }
                                      //     else
                                      //     {
                                      //       return false
                                      //     }
                                      // }})
                                      //   return parentResult
                                      // }

                                      //   function spouseSearch(person, people){
                                      //     let spouseResult = people.filter(function(potentialMatch){
                                      //       if (person.id === potentialMatch.id){
                                      //         return (person.spouse)
                                      //       }
                                      //       else{
                                      //         return false;
                                      //       }
                                      //     })
                                      //   return spouseResult
                                      //   }



                                      // // function displayFamily(person, siblings, parents,spouse)
                                      // // {
                                      // //   alert(people.map(function(person, siblings,parents,spouse){
                                      // //     return person.firstName + " " + person.lastName + "'s siblings are "+  siblings  + '\n' + 'Parents are ' + parents + '\n ' + 'Spouse is ' + spouse}).join("\n"))
                                      // //   }

                                        
                                      // function displayFamily(person, siblings, parents,spouse)
                                      // {
                                      //   alert(
                                      //     person.firstName + " " + person.lastName + "'s siblings are "+  siblings.join  + '\n' + 'Parents are ' + parents.join + '\n ' + 'Spouse is ' + spouse)("\n")
                                      //   }






