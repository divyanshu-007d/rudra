// Day 11: API Testing Script
// Run this file to test all CRUD operations

import http from 'http';

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsedBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testAPI() {
  console.log('🧪 Testing Student CRUD API...\n');

  try {
    // Test 1: GET all students
    console.log('1️⃣ Testing GET /students');
    const getAllResult = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/students',
      method: 'GET'
    });
    console.log(`Status: ${getAllResult.status}`);
    console.log(`Students found: ${getAllResult.data.count}\n`);

    // Test 2: GET student by ID
    console.log('2️⃣ Testing GET /students/1');
    const getOneResult = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/students/1',
      method: 'GET'
    });
    console.log(`Status: ${getOneResult.status}`);
    console.log(`Student: ${getOneResult.data.data?.name}\n`);

    // Test 3: POST new student
    console.log('3️⃣ Testing POST /students');
    const newStudent = {
      name: "Amit Singh",
      email: "amit.singh@email.com",
      age: 22,
      course: "Data Science",
      grade: "A",
      city: "Pune"
    };
    
    const createResult = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/students',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, newStudent);
    console.log(`Status: ${createResult.status}`);
    console.log(`Created: ${createResult.data.data?.name} (ID: ${createResult.data.data?.id})\n`);

    const newStudentId = createResult.data.data?.id;

    // Test 4: PUT update student
    if (newStudentId) {
      console.log('4️⃣ Testing PUT /students/:id');
      const updateData = {
        grade: "A+",
        city: "Chennai"
      };
      
      const updateResult = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: `/students/${newStudentId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }, updateData);
      console.log(`Status: ${updateResult.status}`);
      console.log(`Updated: ${updateResult.data.data?.name} - Grade: ${updateResult.data.data?.grade}\n`);
    }

    // Test 5: GET statistics
    console.log('5️⃣ Testing GET /stats');
    const statsResult = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/stats',
      method: 'GET'
    });
    console.log(`Status: ${statsResult.status}`);
    console.log(`Total Students: ${statsResult.data.data?.totalStudents}`);
    console.log(`Average Age: ${statsResult.data.data?.averageAge}\n`);

    // Test 6: DELETE student
    if (newStudentId) {
      console.log('6️⃣ Testing DELETE /students/:id');
      const deleteResult = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: `/students/${newStudentId}`,
        method: 'DELETE'
      });
      console.log(`Status: ${deleteResult.status}`);
      console.log(`Deleted: ${deleteResult.data.data?.name}\n`);
    }

    // Test 7: GET filtered students
    console.log('7️⃣ Testing GET /students?course=Computer');
    const filterResult = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/students?course=Computer',
      method: 'GET'
    });
    console.log(`Status: ${filterResult.status}`);
    console.log(`Filtered Students: ${filterResult.data.count}\n`);

    console.log('✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the server is running: npm start');
  }
}

// Run tests
testAPI();