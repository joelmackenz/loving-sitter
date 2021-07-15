## **Create Convo**

Creates a new Conversation (convo)

-   **Method:** `POST`
-   **URL:** /convo
-   **URL Params:** None

### **Data Params**

-   **Required:** `users: [Users]`
-   **Optional:** `messages: { author: mongoose.ObjectId, body: String, time: Date }`

### **Sample Call**

```javascript
axios
    .post("convo",
        {
        "users": [ <User1 id>, <User2 id> ]
    }
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---

## **Get a single conversation**

Accepts a convo id and returns the entire JSON object for one specific convo.

-   **Method:** `GET`
-   **URL:** /convo
-   **URL Params:** /:convoId

### **Data Params**

-   **Required:** `users: [Users]`

### **Sample Call**

```javascript
axios
    .get("convo/60c1a73d7f6618582d7e097a")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---

## **Get all messages from a single conversation**

Returns a JSON Object containing all messages from a single conversation

-   **Method:** `GET`
-   **URL:** /convo
-   **URL Params:** /:convoId/:messageId

### **Data Params**

None

### **Sample Call**

```javascript
axios
    .get("convo/messages/60c007380cb3572c810c1d97/60c170356fea0c4e73d6f223")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---
