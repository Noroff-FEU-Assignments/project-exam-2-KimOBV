import useAxios from "../../../hooks/useAxios";
import ModalVertical from "../../common/ModalVertical";
import { useState } from "react";

export default function DeletePost({ id }) {
  const http = useAxios();
  const [show, setShow] = useState(false);

  async function deletePost() {
    try {
      const response = await http.delete(`posts/${id}`);
      console.log("response", response);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <button className="cta-secondary delete" onClick={() => setShow(true)}>
        Delete
      </button>
      <ModalVertical show={show} onHide={() => setShow(false)} heading="Are you sure you want to delete this post?">
        <div className="d-flex gap-5">
          <button className="cta-secondary delete" onClick={() => deletePost()}>
            Delete
          </button>
          <button className="cta-secondary" onClick={() => setShow(false)}>
            Cancel
          </button>
        </div>
      </ModalVertical>
    </>
  );
}
