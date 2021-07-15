## **Add message**

Creates a new message, stored in a conversation. Requires the convo id. User in req body must be a member of convo.users.

-   **Method:** `POST`
-   **URL:** /message
-   **URL Params:** /:convoId

### **Data Params**

-   **Required:** `message: {author: mongoose.ObjectId, body: String}`

### **Sample Call**

```javascript
axios
    .post("message/60c1201d2e37bf3ea3760597",
        {
        "author": <User id>,
        "message": "Hello!"
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---

## **Edit a message**

Edits the body of a specific message. Requires the convo and message Ids.

-   **Method:** `PUT`
-   **URL:** /message
-   **URL Params:** /:convoId/:messageId

### **Data Params**

-   **Required:** `users: [Users]`

### **Sample Call**

```javascript
axios
    .put("message/60c1201d2e37bf3ea3760597/60c170366fea0c4e73d6f224", {
        message: { body: "Updated message" },
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---

## **Delete a message**

Removes a specific message from a convo entirely. Requires the convo and message Ids.

-   **Method:** `DELETE`
-   **URL:** /message
-   **URL Params:** /:convoId/:messageId

### **Data Params**

None

### **Sample Call**

```javascript
axios
    .delete("convo/messages/60c1201d2e37bf3ea3760597/60c170366fea0c4e73d6f224")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---
