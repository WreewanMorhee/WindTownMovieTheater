import { json } from "@remix-run/node";
import { post_error } from "~/api/post-error";

export const error_res = (
  code: number,
  error?: unknown,
) => {
  if (code === 500) {
    post_error(error)
  }

  switch (code) {
    case 404:
      return json({ message: "Item not found", code: 404 }, { status: 404 });
    case 400:
      return json({ message: "Parameters Error", code: 400 }, { status: 400 });
    case 500:
      return json(
        { message: "Error handling item", code: 500, error },
        { status: 500 }
      );
    case 409:
      return json(
        { message: "Item already exists", code: 409 },
        { status: 409 }
      );
  }
};
