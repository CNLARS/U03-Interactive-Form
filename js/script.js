/******************************************
Treehouse FSJS Techdegree: CNLARS
project 3 - Interactive Form
******************************************/

// Study guide for this project: https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view

//const{allation} collection:
const $otherJobTitle = $('#other-title');
//****Global T-Shirt const***//
const $selectShirtTheme = $('<option value="please select">Please select a T-shirt theme</option>');
const $colorSelection = $('#color');
const $colorOptions = $('#color option');

const checkbox = document.querySelectorAll('.activities input'); //global const
const totalAmountDue = document.createElement('label'); //global const

$('span').hide(); //unobtrusive - included in html

//On page load, cursor focuses on the name field by default
$('#name').ready( function( ) {
  $('#name').focus();
});

//Initially hidden text field using JS
$otherJobTitle.hide();

//Text field shows when the "Other" option is selected
$('#title').on('change', function( ) {
  if ($(this).val() === 'other') {
    $otherJobTitle.show();
      } else {
    $otherJobTitle.hide();
  }
});

/*T-Shirt Info:
Default, no color options appear and reads “Please select a T-shirt theme”.*/
$('#color').ready( function( ) {

  $('#color').prepend($selectShirtTheme);
  $('#design').val('Select Theme');
  $('#color').val('please select');
  $('#color').hide(); // exceeds expectations

  $colorOptions.attr('hidden', true).hide();
  //Maybe $colorOptions.eq(0).attr('disabled', 'hidden', true);
  $('#color option[value="please select"]').attr('disabled', 'hidden', true).hide();
  $('#design option').eq(0).attr('disabled', 'hidden', true).hide();
});

// After selecting either theme, only display options that match the design selected:
$('#design').change(function(event){

	console.log($(event.target).val() ); //for testing purposes

  $('option').each(function(i, option){
    if( $('option').val() === $(event.target).val() ){
      $('option:selected');
        } else {
      $('option').off('selected')
    }

    const themeColors = $(event.target).val();
      switch(themeColors) {
        case 'js puns':
              $('#color').show(); // exceeds expectations
          $('#color').val('please select');
              $colorOptions.eq(0).removeAttr('disabled').attr('visible', true).show();
              $colorOptions.eq(1).removeAttr('disabled').attr('visible', true).show();
              $colorOptions.eq(2).removeAttr('disabled').attr('visible', true).show();
          $colorOptions.eq(3).attr('disabled', 'hidden', true).hide();
          $colorOptions.eq(4).attr('disabled', 'hidden', true).hide();
          $colorOptions.eq(5).attr('disabled', 'hidden', true).hide();
        break;

        case 'heart js':
              $('#color').show(); // exceeds expectations
            $('#color').val('please select');
          $colorOptions.eq(0).attr('disabled', 'hidden', true).hide();
          $colorOptions.eq(1).attr('disabled', 'hidden', true).hide();
          $colorOptions.eq(2).attr('disabled', 'hidden', true).hide();
              $colorOptions.eq(3).removeAttr('disabled').attr('visible', true).show();
              $colorOptions.eq(4).removeAttr('disabled').attr('visible', true).show();
              $colorOptions.eq(5).removeAttr('disabled').attr('visible', true).show();
        break;

        default: console.log('Error: Not an Option')
        break;
      }
    });
  });

//Display the total activity cost:
$('.activities').append(totalAmountDue);

//Intial variable of total activity cost:
let finalPrice = 0;
$('input[type=checkbox]').on('click', function(event){
  const $clicked = $(event.target);
  const clickedCost = $(event.target).attr('data-cost');
  const workshopPrice = clickedCost.slice(1);
  const workshopAmount = parseInt(workshopPrice, 10);
    console.log('Osaka', typeof workshopAmount, workshopAmount); //Returns a number

//Displaying total activity cost:

  //Original if/else snippet - with guidance from Slack - Thanks @Lee V!

    // if ( $clicked.prop('checked') === true ) {
    //   finalPrice += workshopAmount;
    // } else {
    //   finalPrice -= workshopAmount;
    // }

  // if/else snippet - reconfigured as a conditional (ternary) operator
  ( $clicked.prop('checked') === true ) ?
    finalPrice += workshopAmount:
        finalPrice -= workshopAmount;

    $(totalAmountDue).html('<strong>Total: $</strong>' + finalPrice);
             console.log(finalPrice); //testing123

//Disabling Conflicting activities

const dayTimeData = $clicked.attr('data-day-and-time');
  //console.log(dayTimeData);
const checkbox = $('input[type=checkbox]');

for (let i = 0; i < checkbox.length; i += 1) {
 //if/else snippet structure from Slack's @Lee V's advice and Office Hours:
  if ( $('input[name=js-frameworks]').is(':checked') && $('input[name=js-frameworks]').attr('data-day-and-time') ) {
     // disabled true express
     $('input[name=express]').prop('disabled', 'hidden');
     console.log(dayTimeData, 'Kyoto');
   } else {
      $('input[name=express]').removeAttr('disabled', 'hidden');
   }

  if ( $('input[name=express]').is(':checked') && $('input[name=express]').attr('data-day-and-time') ) {
     // disabled true js-frameworks
     $('input[name=js-frameworks]').prop('disabled', 'hidden');
     console.log(dayTimeData, 'Nagoya');
   } else {
      $('input[name=js-frameworks]').removeAttr('disabled', 'hidden');
   }

  if ( $('input[name=js-libs]').is(':checked') && $('input[name=js-libs]').attr('data-day-and-time') ) {
     // disabled true node
     $('input[name=node]').prop('disabled', 'hidden');
     console.log(dayTimeData, 'Tsuruga');
   } else {
      $('input[name=node]').removeAttr('disabled', 'hidden');
   }

  if ( $('input[name=node]').is(':checked') && $('input[name=node]').attr('data-day-and-time') ) {
     // disabled true js-libs
     $('input[name=js-libs]').prop('disabled', 'hidden');
     console.log(dayTimeData, 'Tokyo');
   } else {
         $('input[name=js-libs]').removeAttr('disabled', 'hidden');
      }
    };
});

//Payment Section

//Default select option CC set as default
$('#payment option[value="select method"]').attr('disabled', 'hidden', true).remove();
  $('#credit-card').show();
    $('#paypal').hide();
      $('#bitcoin').hide();

  $('#payment').change(function(event){

    $('option').each(function(i, option){
      if( $('option').val() === $(event.target).val() ){
        $('option:selected');
      } else {
    $('option').off('selected')
  }

const payType = $(event.target).val();

  switch(payType) {

  case 'Credit Card':
    $('#credit-card').show();
    $('#cc-num').ready( function( ) {
      $('#cc-num').focus();
        });
    $('#paypal').hide();
    $('#bitcoin').hide();
  break;

  case 'PayPal':
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  break;

  case 'Bitcoin':
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  break;

  default: console.log('Error: Not a Payment Option')
  break;
}
  });
});

//Happy Coding : )

let nameRegex = /^[a-zA-Z ]+$/;
let emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;

let ccRegex = /^\d{13,16}$/; //Length of 13 to 16 digits.

let zipRegex = /^\d{5}$|^\d{5}-\d{4}$/; //5 or 9 digit zip code
let cvvRegex = /^\d{3,4}$/; //3-4 CVV


//Name [real time validator]
$('#name').on('input', function () {
  if (!$('#name').val().match(nameRegex)) {
    $('span').eq(1).fadeIn();
    $('#name').css("borderColor", 'red');
  } else {
    $('#name').css("borderColor", '');
    $('span').eq(1).fadeOut();
  }
});
//Email [real time validator]
$('#mail').on('input', function () {
  if (!$('#mail').val().match(emailRegex)) {
    $('span').eq(2).fadeIn();
    $('#mail').css("borderColor", 'red');
  } else {
    $('#mail').css("borderColor", '');
    $('span').eq(2).fadeOut();
  }
});
//Activities [real time validator]
$('input[type=checkbox]').on('change', function () {
  if (!$('input[type=checkbox]').is(':checked')) {
    $('span').eq(3).fadeIn();
    $('span').eq(4).fadeIn();
  } else {
    $('span').eq(3).fadeOut();
    $('span').eq(4).fadeOut();
  }
});

//Credit Card [real time validator]
$('#cc-num').on('input', function () {
  if (!$('#cc-num').val().match(ccRegex)) {
    $('span').eq(5).fadeIn();
    $('#cc-num').css("borderColor", 'red');
  } else {
    $('#cc-num').css("borderColor", '');
    $('span').eq(5).fadeOut();
  }
});
//Zip Code [real time validator]
$('#zip').on('input', function () {
  if (!$('#zip').val().match(zipRegex)) {
    $('span').eq(6).fadeIn();
    $('#zip').css("borderColor", 'red');
  } else {
    $('#zip').css("borderColor", '');
    $('span').eq(6).fadeOut();
  }
});
//CVV [real time validator]
$('#cvv').on('input', function () {
  if (!$('#cvv').val().match(cvvRegex)) {
    $('span').eq(7).fadeIn();
    $('#cvv').css("borderColor", 'red');
  } else {
    $('#cvv').css("borderColor", '');
    $('span').eq(7).fadeOut();
  }
});

//in Progress final form submssion:

// if ( $('form').onsubmit() ) {
//   $('form').submit();
//     } else {
//       event.preventDefault();
//         }