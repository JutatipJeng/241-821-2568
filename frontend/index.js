console.log('index.js loaded successfully');

function submitData() {
    console.log('submitData function called - START');
    
    // ดึงข้อมูลจากฟอร์ม
    const firstnameInput = document.querySelector('input[name="firstname"]');
    const lastnameInput = document.querySelector('input[name="lastname"]');
    const ageInput = document.querySelector('input[name="age"]');
    const descriptionInput = document.querySelector('textarea[name="description"]');
    
    if (!firstnameInput || !lastnameInput || !ageInput || !descriptionInput) {
        console.error('ไม่พบ input elements');
        return;
    }
    
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const age = ageInput.value;
    
    console.log('firstname:', firstname);
    console.log('lastname:', lastname);
    console.log('age:', age);
    
    // ดึงข้อมูลเพศ
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    let selectedGender = '';
    genderOptions.forEach(option => {
        console.log('Gender option:', option.value, 'checked:', option.checked);
        if (option.checked) {
            selectedGender = option.value;
        }
    });
    
    console.log('selectedGender:', selectedGender);
    
    // ดึงข้อมูลงานอดิเรก
    const interestOptions = document.querySelectorAll('input[name="interest"]');
    const selectedInterests = [];
    interestOptions.forEach(option => {
        console.log('Interest option:', option.value, 'checked:', option.checked);
        if (option.checked) {
            selectedInterests.push(option.value);
        }
    });
    
    console.log('selectedInterests:', selectedInterests);
    
    // ดึงข้อมูลคำอธิบาย
    const description = descriptionInput.value;
    
    console.log('description:', description);
    
    // element แสดงข้อความสถานะ (error/success)
    const messageDOM = document.getElementById('message');
    messageDOM.textContent = '';
    messageDOM.className = '';
    
    // ตรวจสอบข้อมูล
    if (!firstname || !firstname.trim()) {
        console.error('ไม่มี firstname');
        messageDOM.textContent = 'กรุณากรอกชื่อ';
        messageDOM.className = 'message error';
        return;
    }
    
    if (!lastname || !lastname.trim()) {
        console.error('ไม่มี lastname');
        messageDOM.textContent = 'กรุณากรอกนามสกุล';
        messageDOM.className = 'message error';
        return;
    }
    
    // ตรวจสอบ firstname/lastname ว่ามีตัวเลขหรืออักษรพิเศษหรือไม่
    // อนุญาตเฉพาะตัวอักษรไทย-อังกฤษและช่องว่าง
    const invalidCharRegex = /[^a-zA-Z\u0E00-\u0E7F\s]/;
    if (invalidCharRegex.test(firstname)) {
        console.error('ชื่อมีตัวเลขหรืออักษรพิเศษ');
        messageDOM.textContent = 'ชื่อห้ามมีตัวเลขหรืออักษรพิเศษ';
        messageDOM.className = 'message error';
        return;
    }
    if (invalidCharRegex.test(lastname)) {
        console.error('นามสกุลมีตัวเลขหรืออักษรพิเศษ');
        messageDOM.textContent = 'นามสกุลห้ามมีตัวเลขหรืออักษรพิเศษ';
        messageDOM.className = 'message error';
        return;
    }
    
    if (!age) {
        console.error('ไม่มี age');
        messageDOM.textContent = 'กรุณากรอกอายุ';
        messageDOM.className = 'message error';
        return;
    }
    
    if (!selectedGender) {
        console.error('ไม่มี gender');
        messageDOM.textContent = 'กรุณาเลือกเพศ';
        messageDOM.className = 'message error';
        return;
    }
    
    if (selectedInterests.length === 0) {
        console.error('ไม่มี interests');
        messageDOM.textContent = 'กรุณาเลือกงานอดิเรกอย่างน้อย 1 รายการ';
        messageDOM.className = 'message error';
        return;
    }
    
    // สร้าง object เก็บข้อมูล
    const formData = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        age: parseInt(age),
        gender: selectedGender,
        interest: selectedInterests[0],
        description: description.trim()
    };
    
    // log data for debugging but do not show to user
    console.log('ข้อมูลที่ส่ง:', formData);
    try {
         axios.post('http://localhost:8000/users', formData);
        console.log('Data sent to backend successfully');
        messageDOM.textContent = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = "message success";
    } catch (error) {
        if (error.response) {
            console.log('Backend responded with an error:', error.response.data);
            messageDOM.textContent = 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: ' + error.response.data.message;
        } else {
            console.error('Error sending data:', error);
            messageDOM.textContent = 'เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง backend';
        }
        messageDOM.className = "message error";
    }
    
}
