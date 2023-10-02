const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.news_category.forEach
        ((category) => {
            const div = document.createElement('div');
            // console.log(category)
            div.innerHTML = `
        <a onclick="handleLoadNews(${category?.category_id})" 
        class="tab">${category?.category_name}</a> 
        `;
            tabContainer.appendChild(div);
        });
    // console.log(data.data.news_category);

};

const handleLoadNews = async (categoryID) => {
    // console.log(categoryID);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryID}`);
    const data = await response.json()
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    let msg = data?.data;
    let showError = document.getElementById('errorMassage');
    if (msg.length === 0) {
        showError.innerHTML = " Here, the total view and author name are null"
    } else {
        showError.innerHTML = ' '
    }
    data.data?.forEach((news) => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-auto bg-base-100 shadow-xl">
                    <figure>
                        <img src=${news?.image_url} alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            ${news?.title.slice(0, 50)}
                            <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
                        </h2>
                        <p>
                        ${news?.details.slice(0, 40)}
                        </p>
                        <h5>Total views: ${news.total_view ? news?.total_view : "no views"} </h5>
                        <div class="card-footer flex justify-between mt-8">
                            <div class="flex">
                                <div>
                                    <div class="avatar online">
                                        <div class="w-14 rounded-full">
                                            <img src=${news?.author?.img} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h6>${news?.author?.name}</h6>
                                    <small>${news?.author?.published_date}</small>
                                </div>
                            </div>
                            <div class="card-detaild-btn">
                                <button onclick="handleModal('${news._id}')"
                                    class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
        `;
        cardContainer.appendChild(div);

    });
};

const handleModal = async(newsId) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json();
    const info = data.data[0];
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = " ";
    const div = document.createElement('div');
    div.innerHTML = `
    <button class="" onclick="show-modal.showModal()"></button>
    <dialog id="show-modal" class="modal">
    <div class="modal-box">
    <img src=${info?.author?.img} alt="Shoes" />
        <h3 class="font-bold text-center text-3xl">${info?.author?.name}</h3>
        <p class="py-4 text-center text-2xl">${info?.author?.published_date}</p>
        <p class="py-5 text-center">${info?.details}</p>
        <div class="modal-action">
        <form method="dialog" class="mx-auto p-2">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
    </dialog> 
        `;
    modalContainer.appendChild(div);
    const modal = document.getElementById('show-modal');
    modal.showModal();

}



handleCategory();
handleLoadNews('1')