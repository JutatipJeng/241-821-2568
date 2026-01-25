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
    
    // ตรวจสอบข้อมูล
    if (!firstname || !firstname.trim()) {
        console.error('ไม่มี firstname');
        alert('กรุณากรอกชื่อ');
        return;
    }
    
    if (!lastname || !lastname.trim()) {
        console.error('ไม่มี lastname');
        alert('กรุณากรอกนามสกุล');
        return;
    }
    
    if (!age) {
        console.error('ไม่มี age');
        alert('กรุณากรอกอายุ');
        return;
    }
    
    if (!selectedGender) {
        console.error('ไม่มี gender');
        alert('กรุณาเลือกเพศ');
        return;
    }
    
    if (selectedInterests.length === 0) {
        console.error('ไม่มี interests');
        alert('กรุณาเลือกงานอดิเรกอย่างน้อย 1 รายการ');
        return;
    }
    
    // สร้าง object เก็บข้อมูล
    const formData = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        age: parseInt(age),
        gender: selectedGender,
        interests: selectedInterests,
        description: description.trim()
    };
    
    // แสดงข้อมูล
    console.log('ข้อมูลที่ส่ง:', formData);
    
    // แสดงข้อมูลในรูปแบบสวย
    let interestText = formData.interests.join(', ');
    let message = `
ข้อมูลของคุณ:
- ชื่อ: ${formData.firstname}
- นามสกุล: ${formData.lastname}
- อายุ: ${formData.age} ปี
- เพศ: ${formData.gender}
- งานอดิเรก: ${interestText}
- คำอธิบาย: ${formData.description || 'ไม่มี'}
    `;
    
    alert(message);
    
    // ส่งข้อมูลไปยังเซิร์ฟเวอร์ (ตัวอย่าง)
    // fetch('/api/submit', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('ข้อมูลส่งสำเร็จ:', data);
    //     alert('ส่งข้อมูลสำเร็จ!');
    // })
    // .catch(error => {
    //     console.error('เกิดข้อผิดพลาด:', error);
    //     alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    // });
}
