
var searchFilter = () => {
    let selectedBbg = document.getElementById("filterByBbg").value;
    console.log(selectedBbg);
    const input = document.querySelector(".form-control");
    const cards = document.getElementsByClassName("member-list-item");
    console.log(cards[1]);
    let textBox = input.value;
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector(".box-content");
        if ((cards[i].classList.contains(selectedBbg) || selectedBbg=="") && title.innerText.toLowerCase().indexOf(textBox.toLowerCase()) > -1) {
            cards[i].classList.remove("d-none");
        } else {
            cards[i].classList.add("d-none");
        }
    }
}

