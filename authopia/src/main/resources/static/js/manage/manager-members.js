var search = function() {
    // find all members
    // alert("searching...");
};

$(".search").on("click", search);
var node = document.querySelectorAll('input[type=search]');

node.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        search();
    }
})


