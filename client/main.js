async function renderItems() {
    const ulEl = document.createElement("ul");

    const res = await fetch("http://localhost:8090/items");
    const items = await res.json();

    for (const item of items) {
        const liEl = document.createElement("li");

        const detailsEl = document.createElement("div");
        detailsEl.innerText = `Name: ${item.name}, Price: €${item.price.toFixed(2)}`

        const buttonEl = document.createElement("button");
        buttonEl.innerText = "Add to Cart";

        buttonEl.addEventListener("click", () => {
            fetch("http://localhost:8090/cart/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
        });

        liEl.appendChild(detailsEl);
        liEl.appendChild(buttonEl);
        ulEl.appendChild(liEl);
    }

    document.body.appendChild(ulEl);
}

renderItems();
