import { Typography, Button } from "@material-tailwind/react";
import { FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";

const RDPage = () => {
  return (
    <div className="min-h-screen mx-auto grid place-items-center text-center px-8">
        <div>
          <FaFlag  className="w-20 h-20 mx-auto" />
          <Typography
            variant="h1"
            color="blue-gray"
            className="mt-10 !text-3xl !leading-relaxed  md:!text-4xl"
          >
            Error 404 <br /> Il semble que quelque chose s&apos;est mal passé.
          </Typography>
          <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Ne vous inquiétez pas, notre équipe est déjà sur le coup. Essayez d&apos;actualiser
          la page ou revenez plus tard.
          </Typography>
          <Button color="gray" className="w-full px-4 md:w-[8rem]">
            <Link to="/main">
            back home
            </Link>
          </Button>
        </div>
      </div>
  )
}

export default RDPage;