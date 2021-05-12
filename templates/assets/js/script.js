$('body').on('click', '[data-action="drawer"]', function() {
  $(this).closest('.card').toggleClass("active");
});