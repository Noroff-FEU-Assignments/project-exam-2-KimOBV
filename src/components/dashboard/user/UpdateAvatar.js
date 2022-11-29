import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  avatar: yup.string().required(),
});

export default function UpdateBanner({ name }) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const http = useAxios();
  async function updateAvatar(data) {
    try {
      const response = await http.put(`profiles/${name}/media`, data);
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(updateAvatar)}>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input {...register("avatar")} id="avatar" />
      </div>
      <button className="cta">Update</button>
    </form>
  );
}
