import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createRoot, Root } from "react-dom/client";
import LoginElf from "~/components/LoginElf";
import { debounce } from "~/tool/debounce";
import {  firebase_app } from "~/tool/firebase-config";
import { app_confirm } from "./app-confirm";
import { app_alert } from "./app-alert";
import { is_in_app_browser } from "./is-in-app-browser";



const toggle_elf = (root: Root, show: boolean) => {
    if (show) {
        root.render(<LoginElf />)
    } else {
        root.unmount()
    }
}

export const user_willingness_check = async (content?: string) => {
    if (!!content) {
        const ok = await app_confirm({content})
        if (!ok) return false
    }


    if (is_in_app_browser()) {
        await app_alert({content: "無法在應用程式內做 Google 登入 \n 請用手機瀏覽器開啟網站後再登入～"})
        return false
    }

    return true
}


export const google_login = async () => {

    const confirm_node = document.getElementById("log-in-out")!
    const root = createRoot(confirm_node)
    toggle_elf(root, true)

    try {
        const auth = getAuth(firebase_app);
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
       

        const token = await result.user.getIdToken();


        await fetch('/api-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        window.location.reload()

    
    } catch (error) {
        console.error('Error during sign-in:', error);
        toggle_elf(root, false)
    }
}