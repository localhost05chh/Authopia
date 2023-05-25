var search = function () {
    // find all members
    // alert("searching...");
};

$(document).ready(function () {
    const $li = $("ul.allMember");

    let text = "";
    members.forEach(member => {
        text += `
            <li class="px-8 py-16 flex items-center border-b border-secondary hover:surface-secondary">
                <div class="text-left w-name block">
                    <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">${member.memberName}</p>
                </div>
                <div class="text-left w-mail block">
                    <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">${member.memberEmail}</p>
                </div>
                <div class="text-left w-category block">
                    <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">에세이</p>
                </div>
                <div class="text-left w-date block">
                    <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">${member.memberRegisterDate}</p>
                </div>
                <div class="text-center w-withdraw block">
                    <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">휴면</p>
                </div>
                <div class="text-right w-pagelink block">
                    <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">없음</p>
                </div>
            </li>
        `
    });

    $li.html(text);
});


$(".search").on("click", search);
var node = document.querySelectorAll('input[type=search]');

node.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        search();
    }
})


