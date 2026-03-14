const Base_URL = 'http://localhost:8000';
window.onload = async() => {
    await loaddata();
}
   const loaddata = async() => {
     const response = await axios.get(`${Base_URL}/users`);
    console.log('Users from backend:', response.data);

    const userDOM = document.getElementById('user');
    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div>
        ${user.id} - ${user.firstname} ${user.lastname}
        <button class="edit" data-id="${user.id}">edit</button>
 
        <button class = 'delete' data-id='${user.id}'>delete</button>

        </div>`
    }
    htmlData += '</div>'
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${Base_URL}/users/${id}`);
                console.log(`User with id ${id} deleted successfully`);
                loaddata(); // รีโหลดข้อมูลหลังจากลบสำเร็จ
                // ลบ element ของ user ที่ถูกลบออกจาก DOM
                event.target.parentElement.remove();
            } catch (error) {
                console.error(`Error deleting user with id ${id}:`, error);
            }
        });
    }

    const editDOMs = document.getElementsByClassName('edit');
    for (let i = 0; i < editDOMs.length; i++) {
        editDOMs[i].addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            window.location.href = `index.html?id=${id}`;
        });
    }
   
}