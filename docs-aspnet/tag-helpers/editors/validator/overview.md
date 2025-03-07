---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Validator for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/validator, /helpers/tag-helpers/validator
slug: taghelpers_validator_aspnetcore
position: 1
---

# Validator TagHelper Overview

The Telerik UI Validator TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Validator widget.

The Validator offers options for implementing client-side form validation.

* [Demo page for the Validator](https://demos.telerik.com/aspnet-core/validator)

## Initializing the Validator

The following example demonstrates how to define the Validator by using the Validator TagHelper.

```TagHelper
    @{
        var messages = new Dictionary<string, string>() { { "custom", "Please choose another Start Time." } };
        var rules = new Dictionary<string, string>() { { "custom", "customFunction" } };
    }
    <form id="ticketsForm" kendo-validator="true" kendo-messages="messages" kendo-rules="rules">
        <ul id="fieldlist">
            <li>
                <label for="fullname" class="required">Your Name</label>
                @(Html.Kendo().TextBox()
                    .Name("fullname")
                    .HtmlAttributes(new { placeholder = "Full name", required = "required", style = "width:220px" })
                )
            </li>
        </ul>
    </form>
``` 
```JavaScript
    <script>
        function customFunction(input) {

            if (input.attr('name') === "time" && input.val() == "14:00") {
                return false;
            }

            return true;
        }

        $(document).ready( function () {
            var validator = $("#ticketsForm").data("kendoValidator");
            var validationSummary = $("#validation-summary");

            $("form").submit(function(event) {
                event.preventDefault();

                if (validator.validate()) {
                    validationSummary.html("<div class='k-messagebox k-messagebox-success'>Hooray! Your tickets has been booked!</div>");
                } else {
                    validationSummary.html("<div class='k-messagebox k-messagebox-error'>Oops! There is invalid data in the form.</div>");
                }
            });
        });
    </script>
```
## See Also

* [Basic Usage of the Validator Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/validator)
