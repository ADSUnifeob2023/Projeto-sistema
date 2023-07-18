$(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").toggleClass("active");
  });
});

$(document).ready(function () {
  const table = new DataTable("#tablecategory", {
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json",
    },
  });

  /**
   * Mask Input
   */
  $("input[name=cpf]").inputmask("999.999.999-99");
  $("input[name=telefone]").inputmask("(99)99999-9999");

  $("input[name=preco]").inputmask("decimal", {
    radixPoint: ",",
    groupSeparator: ".",
    autoGroup: true,
    digits: 2,
    digitsOptional: false,
    placeholder: "0",
    rightAlign: false,
    onBeforeMask: function (value, opts) {
      return value;
    },
  });

  $("input[type=number]").on("change", function () {
    this.value = Math.abs(this.value);
  });

  $("input[type=number]").on("mousewheel", (event) => {
    $(event.target).blur();
  });
});
