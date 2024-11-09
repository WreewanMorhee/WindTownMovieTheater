import { createRoot } from "react-dom/client";
import ConfirmDialog from "~/components/ConfirmDialog";

export const app_confirm = async ({
  title = "",
  content = "",
  cancel_text = "取消",
  confirm_text = "確認",
}) => {
  return new Promise((res) => {
    const confirm_node = document.getElementById("confirm-and-alert")!
    const root = createRoot(confirm_node)

    const no = () => {
      root.unmount();
      res(false);
    };
    const yes = () => {
      root.unmount();
      res(true);
    };

    root.render(
      <ConfirmDialog
        title={title}
        content={content}
        cancel_text={cancel_text}
        confirm_text={confirm_text}
        no={no}
        yes={yes}
      />
    );
  });
};
