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

$('#name').before('<span class="hidden">* Not a Valid Name *</span>');
//$(noName).css({font-weight}) 
$('#mail').before('<span class="hidden">  * Not a Valid E-Mail *</span>');
$('.activities').after('<span class="hidden">  * Select at least one activity for registration *</span>');
$('#cc-num').before('<span class="hidden"> * Enter Valid Number *</span>');
$('#zip').before('<span class="hidden">* Required *</span>');
$('#cvv').before('<span class="hidden">* Required *</span>');

$('#name').before('<span class="hidden">* A-Z only *</span>');
$('#mail').before('<span class="hidden">  * Requires @ and . *</span>');
$('.activities').after('<span class="hidden">  * No Activity Selected *</span>');
$('#cc-num').before('<span class="hidden"> * Requires 13-16 Digits  *</span>');
$('#zip').before('<span class="hidden">* 5 or 9 Digits *</span>');
$('#cvv').before('<span class="hidden">* 3 to 4 Digits *</span>');

$('span').hide();

//On page load, cursor focuses on the name field by default
$('#name').ready(function () {
  $('#name').focus();
});

//Initially hidden text field using JS
$otherJobTitle.hide();

//Text field shows when the "Other" option is selected
$('#title').on('change', function () {
  if ($(this).val() === 'other') {
    $otherJobTitle.show();
  } else {
    $otherJobTitle.hide();
  }
});

/*T-Shirt Info:
Default, no color options appear and reads “Please select a T-shirt theme”.*/
$('#color').ready(function () {

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
$('#design').change(function (event) {

  console.log($(event.target).val()); //for testing purposes

  $('option').each(function (i, option) {
    if ($('option').val() === $(event.target).val()) {
      $('option:selected');
    } else {
      $('option').off('selected')
    }

    const themeColors = $(event.target).val();
    switch (themeColors) {
      case 'js puns':
        $('#color').show(); // exceeds expectations
        $('#color').val('cornflowerblue');
        $colorOptions.eq(0).removeAttr('disabled').attr('visible', true).show();
        $colorOptions.eq(1).removeAttr('disabled').attr('visible', true).show();
        $colorOptions.eq(2).removeAttr('disabled').attr('visible', true).show();
        $colorOptions.eq(3).attr('disabled', 'hidden', true).hide();
        $colorOptions.eq(4).attr('disabled', 'hidden', true).hide();
        $colorOptions.eq(5).attr('disabled', 'hidden', true).hide();
        break;

      case 'heart js':
        $('#color').show(); // exceeds expectations
        $('#color').val('tomato');
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
$('input[type=checkbox]').on('click', function (event) {
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
  ($clicked.prop('checked') === true) ?
    finalPrice += workshopAmount :
    finalPrice -= workshopAmount;

  $(totalAmountDue).html('<strong>Total: $</strong>' + finalPrice);
  console.log(finalPrice); //testing123

  //Disabling Conflicting activities

  const dayTimeData = $clicked.attr('data-day-and-time');
  //console.log(dayTimeData);
  const checkbox = $('input[type=checkbox]');

  for (let i = 0; i < checkbox.length; i += 1) {
    //if/else snippet structure from Slack's @Lee V's advice and Office Hours:
    if ($('input[name=js-frameworks]').is(':checked') && $('input[name=js-frameworks]').attr('data-day-and-time')) {
      // disabled true express
      $('input[name=express]').prop('disabled', 'hidden');
      console.log(dayTimeData, 'Kyoto');
    } else {
      $('input[name=express]').removeAttr('disabled', 'hidden');
    }

    if ($('input[name=express]').is(':checked') && $('input[name=express]').attr('data-day-and-time')) {
      // disabled true js-frameworks
      $('input[name=js-frameworks]').prop('disabled', 'hidden');
      console.log(dayTimeData, 'Nagoya');
    } else {
      $('input[name=js-frameworks]').removeAttr('disabled', 'hidden');
    }

    if ($('input[name=js-libs]').is(':checked') && $('input[name=js-libs]').attr('data-day-and-time')) {
      // disabled true node
      $('input[name=node]').prop('disabled', 'hidden');
      console.log(dayTimeData, 'Tsuruga');
    } else {
      $('input[name=node]').removeAttr('disabled', 'hidden');
    }

    if ($('input[name=node]').is(':checked') && $('input[name=node]').attr('data-day-and-time')) {
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

$('#payment').change(function (event) {

  $('option').each(function (i, option) {
    if ($('option').val() === $(event.target).val()) {
      $('option:selected');
    } else {
      $('option').off('selected')
    }

    const payType = $(event.target).val();

    switch (payType) {

      case 'Credit Card':
        $('#credit-card').show();
        $('#cc-num').ready(function () {
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


//Name [real time validator : exceeds expectations]
$('#name').on('input', function () {
  if (!$('#name').val().match(nameRegex)) {
    $('span').eq(2).fadeIn();
    $('#name').css("borderColor", 'red');
  } else {
    $('#name').css("borderColor", '');
    $('span').eq(2).fadeOut();
  }
});
//Email [real time validator : exceeds expectations]
$('#mail').on('input', function () {
  if (!$('#mail').val().match(emailRegex)) {
    $('span').eq(4).fadeIn();
    $('#mail').css("borderColor", 'red');
  } else {
    $('#mail').css("borderColor", '');
    $('span').eq(4).fadeOut();
  }
});
//Activities [real time validator : exceeds expectations]
$('input[type=checkbox]').on('change', function () {
  if (!$('input[type=checkbox]').is(':checked')) {
    $('span').eq(6).fadeIn();
  } else {
    $('span').eq(6).fadeOut();
  }
});

//Credit Card [real time validator : exceeds expectations]
$('#cc-num').on('input', function () {
  if (!$('#cc-num').val().match(ccRegex)) {
    $('span').eq(7).fadeIn();
    $('#cc-num').css("borderColor", 'red');
  } else {
    $('#cc-num').css("borderColor", '');
    $('span').eq(7).fadeOut();
  }
});
//Zip Code [real time validator : exceeds expectations]
$('#zip').on('input', function () {
  if (!$('#zip').val().match(zipRegex)) {
    $('span').eq(10).fadeIn();
    $('#zip').css("borderColor", 'red');
  } else {
    $('#zip').css("borderColor", '');
    $('span').eq(10).fadeOut();
  }
});
//CVV [real time validator : exceeds expectations]
$('#cvv').on('input', function () {
  if (!$('#cvv').val().match(cvvRegex)) {
    $('span').eq(12).fadeIn();
    $('#cvv').css("borderColor", 'red');
  } else {
    $('#cvv').css("borderColor", '');
    $('span').eq(12).fadeOut();
  }
});

//in Progress final form submssion:
$('form').submit(function () {
  const validName = $('#name').val().match(nameRegex);
  const validEmail = $('#mail').val().match(emailRegex);
  const validActivity = $('input[type=checkbox]').is(':checked');
  const validPaymentBitcoin = $('#payment option[value="bitcoin"]').is(':selected');
  const validPaymentPaypal = $('#payment option[value="paypal"]').is(':selected');
  const validPaymentCC = $('#payment option[value="Credit Card"]').is(':selected');
  const validCCNum = $('#cc-num').val().match(ccRegex);
  const validZip = $('#zip').val().match(zipRegex);
  const validCVV = $('#cvv').val().match(cvvRegex);
  
  if (
    (validName && validEmail && validActivity && validPaymentCC && validCCNum && validZip && validCVV)
    || (validName && validEmail && validActivity && validPaymentBitcoin)
    || (validName && validEmail && validActivity && validPaymentPaypal)) {
    return true;

  } else {

    if ($('#name').val() === '') {
      $('span').eq(1).fadeIn();
      $('#name').css("borderColor", 'red');
      
    }
    if ($('#mail').val() === '') {
      $('span').eq(3).fadeIn();
      $('#mail').css("borderColor", 'red');
     
    }
    if (validActivity === false) {
      $('span').eq(5).fadeIn();
     
    }
    if (validPaymentCC) {

      if ($('#cc-num').val() === '') {
        $('span').eq(8).fadeIn();
        $('#cc-num').css("borderColor", 'red');
        
      }

      if ($('#zip').val() === '') {
        $('span').eq(9).fadeIn();
        $('#zip').css("borderColor", 'red');
       
      }
      if ($('#cvv').val() === '') {
        $('span').eq(11).fadeIn();
        $('#cvv').css("borderColor", 'red');
        
      }

      return false;
      
    } else if (validPaymentPaypal || validPaymentBitcoin) {
        return true;
    }
  }


});