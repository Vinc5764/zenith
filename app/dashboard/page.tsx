/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";


import useTokenStore from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import PartnerDashboard from "@/components/Partner";
import AdminDashboard from "@/components/Admin";


const baseURL = "https://kanassetmanagement.com";

const HomePage = () => {
  const { userType, datas, setUserType }: any = useTokenStore();
  const [resolvedUserType, setResolvedUserType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [name] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Set the resolved user type from the store when the component mounts
    if (userType) {
      setResolvedUserType(userType);
      if (userType === "newmember") {
        setShowModal(true);
      }
    }
  }, [userType]);

  // Handle cases where userType might not be resolved immediately
  if (resolvedUserType === null) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handleSave = async () => {
    try {
      const apiUrl = `${baseURL}/api/reset`;

      // Data to send in the request body
      const data = {
        name,
        password,
        userId: datas?.user?._id,
      };

      // Make the POST request to update the user's name and password
      const response = await axios.post(apiUrl, data);

      if (response ) {
        setUserType("member");
        // setNames(response.data.user.name);
        alert("User updated successfully");
        setShowModal(false); // Close the modal after saving
      } else {
        console.error("Failed to update user", response.data);
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className=" ">
      <div className=" ">
        {resolvedUserType === "member" && <PartnerDashboard />}
        {resolvedUserType === "admin" && <AdminDashboard />}
      </div>
      {showModal && (
        <Dialog open={true} onOpenChange={() => setShowModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Name and Reset Password</DialogTitle>
              <DialogDescription>
                Please set your firstname and reset your password.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {/* <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave} className="mt-4">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
