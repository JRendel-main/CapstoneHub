let data; // Declare the data variable in a scope accessible to both functions

// Document ready
function randomCapstone() {
    if (data) {
        // Get a random item from the data
        let random = Math.floor(Math.random() * data.length);
        let title = data[random].title;
        let description = data[random].description;
        let submit_by = data[random].by;
        let link = data[random].link;
        let profile_link = data[random].profile_link;

        // get every tags on array
        let tags = data[random].tags;
        let tags_html = '';
        for (let i = 0; i < tags.length; i++) {
            tags_html += ' <span class="badge badge-pill badge-primary">' + tags[i] + '</span>';
        }
        // put to html
        $('#tags').html(tags_html);

        // Display data
        $('#capstone-title').text(title);
        $('#capstone-description').text(description);
        $('#submit-by').html('Submitted by: ' + '<span class="text-muted">' + submit_by + '</span>');
        // change href
        $('#project_link').attr('href', link);
        $('#profile_link').attr('href', profile_link);
    }
}

function initializeDataTable() {
    // Check if DataTable is already initialized
    if ($.fn.DataTable.isDataTable('#capstone-list')) {
        $('#capstone-list').DataTable().clear().destroy();
    }

    // Initialize DataTable
    $('#capstone-list').DataTable({
        responsive: true,
        data: data,
        columns: [
            {
                title: "Capstone Title",
                data: "title"
            },
            {
                title: "Submitted By",
                data: "by"
            },
        ]
    });
}

$(document).ready(function () {
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        success: function (jsonData) {
            data = jsonData; // Store the data for later use
            initializeDataTable(); // Initialize the table
            randomCapstone(); // Display random data
        },
        error: function (err) {
            console.log(err);
        }
    });

    // If generate-btn is clicked
    $('#generate-btn').click(function () {
        // Call function to display random data
        randomCapstone();
    });

    $('#copy-btn').click(function () {
        let title = $('#capstone-title').text();
        navigator.clipboard.writeText(title).then(function () {
            alert('Copied to clipboard');
        }).catch(function (err) {
            console.log(err);
        });
    });
});
