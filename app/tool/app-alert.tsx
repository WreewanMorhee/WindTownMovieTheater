import { createRoot } from "react-dom/client";
import AlertDialog from "~/components/AlertDialog";

export const app_alert = async ({
  content = "",
  confirm_text = "確定",
}) => {
  return new Promise((res) => {
    const confirm_node = document.getElementById("confirm-and-alert")!
    const root = createRoot(confirm_node)


    const yes = () => {
      root.unmount();
      res(true);
    };

    root.render(
      <AlertDialog
        content={content}
        confirm_text={confirm_text}
        yes={yes}
      />
    );
  });
};
