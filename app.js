loginheader = {
        "Host": "takay.csucarig.edu.ph",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Content-Length": "39",
        "Origin": "https://portal.csucarig.edu.ph",
        "Connection": "keep-alive",
        "Referer": "https://portal.csucarig.edu.ph/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "TE": "trailers"
}

async function getToken() {
    let url = "https://takay.csucarig.edu.ph/auth/login"  
    var token = ""
 
    let data = {
      "UserID":document.getElementById("username").value,
      "Password":document.getElementById("password").value
    }
  
    let options = {
      'method': 'POST',
      'body': JSON.stringify(data),
      'headers': loginheader,
      //'muteHttpExceptions': true
    }
    
    const response = await fetch(url, options) 
    json = await response.json()
    return json["access_token"]
}

async function getSubs(token) {
    checklistUrl = "https://takay.csucarig.edu.ph/studentChecklistAdvised"
    const checklistheader = {
        "Host": "takay.csucarig.edu.ph",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Authorization": "Bearer "+token,
        "Origin": "https://portal.csucarig.edu.ph",
        "DNT": "1",
        "Connection": "keep-alive",
        "Referer": "https://portal.csucarig.edu.ph/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Content-Length": "0",
        "TE": "trailers"
    }

    const response = await fetch(checklistUrl, {"method": "POST", "headers":checklistheader}) 
    json = await response.json()
    return json[0]
}

function createTable(subjects) {
    const body = document.body,
          tbl = document.createElement('table');
    tbl.style.border = '1px solid black'; 
    let head = tbl.insertRow()
    let grade = head.insertCell()
    grade.style.border = '1px solid black'
    grade.appendChild(document.createTextNode("Grade"))
    let name = head.insertCell()
    name.style.border = '1px solid black'
    name.appendChild(document.createTextNode("Name"))


    for (s in subjects) {
        let sub = subjects[s]
        let name = sub["SubjectDescription"]
        let grade = sub["Grade"]

        let row = tbl.insertRow()
        
        let gCell = row.insertCell()
        gCell.style.border = '1px solid black'
        gCell.appendChild(document.createTextNode(grade))
        
        let nCell = row.insertCell()
        nCell.style.border = '1px solid black'
        nCell.appendChild(document.createTextNode(name))
    }
       
    body.appendChild(tbl);
}

async function login() {
    token = await getToken() 
    subs = await getSubs(token)
    createTable(subs)
}