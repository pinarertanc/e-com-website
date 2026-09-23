'use client';

import React, {useState } from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Save } from "lucide-react";
import { UserSettingFormProps } from "@/types/user";

export function userSettingsForm({user, initialData}:UserSettingFormProps){
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [phone, setPhone] = useState(initialData?.phone || "");
  const [city, setCity] = useState (initialData?.city || "");
  const [district, setDistrict] = useState(initialData?. district || "");
  const [address, setAddress] = useState(initialData?.address || "");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
  }
}



