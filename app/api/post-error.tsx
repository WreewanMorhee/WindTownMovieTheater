import { origin } from "~/config/origin";
import { format_date } from "~/tool/transform-date";

export const post_error = async (error: unknown) => {
      fetch(`${process.env.NODE_ENV === "production" ? origin : 'http://localhost:5173/'}error-log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: format_date(new Date()),
          error
        }),
      });
}