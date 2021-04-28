# ajax返回blob封装


```javascript
/**
 * 使用token进行文件请求，返回文件blob
 */

import { getUserToken, getAccessToken } from "@utils/auth";
import { ajaxGetAccessToken } from "@/utils/common"

export default {

  getFileBlobSrcWithToken(fileUrl, ifResponseIsJsonReject, type = "GET", data) {

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest()

      xhr.open(type, fileUrl)
      xhr.setRequestHeader(process.env.VUE_APP_TOKEN_NAME, getAccessToken())
      xhr.setRequestHeader("userToken", getUserToken())
      xhr.responseType = "blob"

      xhr.onreadystatechange = function () {
        if (xhr.readyState === this.DONE) {
          if (xhr.status == 200) {
            try {
              if (ifResponseIsJsonReject) {
                const contentType = xhr.getResponseHeader("Content-Type");
                if (contentType.indexOf("json") !== -1 || contentType.indexOf("text") !== -1) {
                  // 如果是json或text
                  const reader = new FileReader();
                  reader.onload = function (event) {
                    reject(reader.result)
                  };
                  reader.readAsText(this.response);
                  return
                }
              }
              resolve(URL.createObjectURL(this.response));
            } catch (e) {
              reject(e);
            }
          } else {
            if (xhr.status == 401) {
              ajaxGetAccessToken()
            }
            console.error("File Load failed: " + fileUrl)
            reject(new Error(xhr.statusText));
          }
        }
      }

      if (type === "POST") {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send()
      }
    })

  }
}

```