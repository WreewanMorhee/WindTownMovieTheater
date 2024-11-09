import { createRoot } from 'react-dom/client'
import ConfirmDialog from '~/components/ConfirmDialog'

const confirm_node = document.getElementById('confirm-and-alert') as HTMLElement
export const app_confirm = async ({
	title = '',
	content = '',
	cancel_text = '取消',
	confirm_text = '確認',
}) => {
	return new Promise((res) => {
		const root = createRoot(confirm_node)

		const no = () => {
			root.unmount()
			res(false)

			// no_cb()
			// cb()
		}
		const yes = () => {
			root.unmount()
			res(true)

			// yes_cb()
			// cb()
		}

		

		root.render(
				<ConfirmDialog
                title={title}
					content={content}
					cancel_text={cancel_text}
					confirm_text={confirm_text}
					no={no}
					yes={yes}
				/>,
                
		)
	})
}
