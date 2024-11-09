import { useEffect } from "react";
import { useTea } from "~/drinktea/tea";

const GetGoogleLoginRelatedData = ({
  avatar_src, to_see_list, user_id, user_name
}: {
  avatar_src: string, to_see_list: [], user_id: string, user_name: string
}) => {

  const [, set_to_see_list_map] = useTea.to_see_list_map()
  const [, set_my_to_see_list] = useTea.my_to_see_list()
  const [, set_avatar_src] = useTea.avatar_src()
  const [, set_user_id] = useTea.user_id()
  const [, set_user_name] = useTea.user_name()
  useEffect(() => {
    Promise.resolve().then(
      () => {
        set_avatar_src(avatar_src)
        set_to_see_list_map(new Set(Object.keys(to_see_list)))
        set_my_to_see_list(Object.values(typeof to_see_list === 'string' ? undefined : to_see_list ))
        set_user_id(user_id)
        set_user_name(user_name)
      }
    );
  }, [])


  return null
}

export default GetGoogleLoginRelatedData
