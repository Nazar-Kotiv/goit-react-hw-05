import { ThreeDots } from "react-loader-spinner";

export default function LoaderDetails() {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="##000000"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
