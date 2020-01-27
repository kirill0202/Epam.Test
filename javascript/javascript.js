"use script"
let data = [
    { name: 'Яблоки', id: 1, price: 100, count: 10 }
]



function getTemplete(item) {
    return ` <tr>
                <th scope="row"></th>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.count}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="${item.id}editBy" actioType="edit">Edit</button>
                    <button type="button" class="btn btn-danger" id="${item.id}ideleteBy" actioType="del">Delete</button>
                </td>
            </tr>`
}

function renderTable(data) {

    let elem = document.getElementById('tableBody');

    elem.innerHTML = data.map(item => {
        return getTemplete(item);
    })
}


const buttonItem = document.getElementById('addButton');
buttonItem.addEventListener('click', function (event) {
    if (event.target.innerHTML === 'Add') {
        const name = document.getElementById('Name').value.trim()
        const count = document.getElementById('Count').value.trim()
        const price = document.getElementById('Price').value.trim()

        if(name && count && price) {
            data.push({
                name, count, price, id: Math.floor(Math.random() * 1000)
            })
    
            document.getElementById('Name').value = ''
            document.getElementById('Count').value = ''
            document.getElementById('Price').value = ''
            renderTable(data)
        }
    }
    else{
        const name = document.getElementById('Name').value
        const count = document.getElementById('Count').value
        const price = document.getElementById('Price').value
        data = data.map(item => {
            if ($('#addButton').attr('itemId') == item.id) {
                return {
                    ...item,
                    name,
                    count,
                    price,
                }
            }

            return item;
        })
        buttonItem.innerHTML = 'Add'
        document.getElementById('Name').value = ''
        document.getElementById('Count').value = ''
        document.getElementById('Price').value = ''
        renderTable(data)
    }
});


$('.table').on('click', function (e) {
    const id = Number.parseInt(event.target.id)

    if ($(e.target).attr('actioType') == 'edit') {
        const item = data.find(item => item.id == id);
        document.getElementById('Name').value = item.name
        document.getElementById('Count').value = item.count
        document.getElementById('Price').value = item.price
        buttonItem.innerHTML = 'Update'
        $('#addButton').attr('itemId', item.id)
    }
    else {

        data = data.filter(item => {
            return id != item.id;
        })
        renderTable(data)
    }
});



const sortFiler = document.getElementById('mySearch');
$(sortFiler).on('keyup', function () {
    let value = $(this).val()
    renderTable(data.filter(item => {
        return item.name.toLowerCase().startsWith(value.toLowerCase());
    }))
})


function seachTable(value, data) {
    let filterData = [name]

    for (let i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        let name = data.name.toLowerCase()
        if (name.includes(value)) {
            filterData.push(data)

        }
    }

    return filterData

}
renderTable(data)




const sortPrice = document.getElementById('sortPrice');
$(sortPrice).on('click', function () {
    data = data.sort((a, b) => a.price - b.price)

    renderTable(data)
})


const sortName = document.getElementById('sortName');
$(sortName).on('click', function () {
    data = data.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        if (a.name == b.name) return 0
    })

})

$(sortName).on('click', function () {
    $(this).toggleClass('transform')
})
$(sortPrice).on('click', function () {
    $(this).toggleClass('transform')
})

const priceSort = document.getElementById('Price');
$(priceSort).on('keyup', function () {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }else{
        
    }
})

const countSort = document.getElementById('Count');
$(countSort).on('keyup', function () {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }else{
     
    }
})
const nameSort = document.getElementById('Name');
$(nameSort).on('keyup', function (e) {
    this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/i, "");
})







