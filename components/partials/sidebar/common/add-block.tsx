"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { X } from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import thumbnail from "@/public/images/all-img/thumbnail.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const AddBlock = ({
  className,
  image = thumbnail,
  title = "",
  desc = "",
}: {
  className?: string;
  image?: any;
  title?: string;
  desc?: string;
}) => {
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <>
     
    </>
  );
};

export default AddBlock;




