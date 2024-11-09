import { useEffect } from 'react'

const SW = () => {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
		  navigator.serviceWorker.getRegistration("/sw.js").then(async (registration) => {
			if (registration) {
	
			  if (registration && registration.waiting) {
				const loadAppConfirm = async () => {
					const { app_confirm } = await import('~/tool/app-confirm');
					return app_confirm;
				  };
				const app_confirm = await loadAppConfirm()

				const ok = await app_confirm({
				  content: '有最新版本更新, 點擊確認即可快速更新。'
				})
	  
				if (ok) {
				  registration.waiting.postMessage({
					type: 'SKIP_WAITING',
				  })
	  
				  window.location.reload()
				}
			  }
	  
			  registration.onupdatefound = () => {
				const installingWorker = registration.installing
				if (installingWorker == null) {
				  return
				}
	  
				installingWorker.onstatechange = async () => {
				  if (installingWorker.state === 'installed') {
					if (navigator.serviceWorker.controller) {
					  // At this point, the updated precached content has been fetched,
					  // but the previous service worker will still serve the older
					  // content until all client tabs are closed.
	  
					  if (registration && registration.waiting) {
						const loadAppConfirm = async () => {
							const { app_confirm } = await import('~/tool/app-confirm');
							return app_confirm;
						  };
						const app_confirm = await loadAppConfirm()
						const ok = await app_confirm({
						  content: '有最新版本更新, 點擊確認即可快速更新。'
						})
	  
						if (ok) {
						  registration.waiting.postMessage({
							type: 'SKIP_WAITING',
						  })
						  window.location.reload()
						}
					  }
					} else {
					  // At this point, everything has been precached.
					  // It's the perfect time to display a
					  // "Content is cached for offline use." message.
					  
					}
				  }
				}
			  }
	
			} else {
			  navigator.serviceWorker
				.register("/sw.js")
				.then((newRegistration) => {
				})
				.catch((error) => {
				  console.warn("ServiceWorker registration failed:", error);
				});
			}
		  });
		}
	  }, []);

	return null
}

export default SW
