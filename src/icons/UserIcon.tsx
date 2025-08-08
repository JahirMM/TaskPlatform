import { SVGProps } from "react";
const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" {...props}>
    <path
      fill="currentColor"
      d="M240 192c0-44.2 35.8-80 80-80s80 35.8 80 80-35.8 80-80 80-80-35.8-80-80zm208 0c0-70.7-57.3-128-128-128s-128 57.3-128 128 57.3 128 128 128 128-57.3 128-128zM144 544c0-70.7 57.3-128 128-128h96c70.7 0 128 57.3 128 128v8c0 13.3 10.7 24 24 24s24-10.7 24-24v-8c0-97.2-78.8-176-176-176h-96c-97.2 0-176 78.8-176 176v8c0 13.3 10.7 24 24 24s24-10.7 24-24v-8z"
    />
  </svg>
);
export default UserIcon;
