import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TwitterSegment: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto my-8">
      {/* Tabs */}
      <Tabs defaultValue="for-you" className="mb-4">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="for-you">For you</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Create Post */}
      <Card className="mb-4">
        <CardContent className="p-4 flex items-start gap-3">
          <Avatar>
            <AvatarImage src="https://via.placeholder.com/40" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input placeholder="What's happening?" className="mb-2" />
            <div className="flex justify-between items-center">
              <div className="flex gap-2 text-gray-500">
                <span>📷</span>
                <span>🎥</span>
                <span>📊</span>
                <span>😊</span>
                <span>📅</span>
              </div>
              <Button size="sm">Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Post */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://via.placeholder.com/40" alt="Profile" />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-sm">Stas Neprokin</div>
              <div className="text-xs text-gray-500">@ModestMitkus · Nov 20, 2023</div>
            </div>
          </div>

          {/* Post content */}
          <div className="text-sm leading-relaxed">
            Everyone should own products that earn $10,000/month.<br /><br />
            Unfortunately, most people have no idea how...<br /><br />
            Here’s my tested blueprint to go from $0 → $10,000/month:
          </div>

          {/* Image */}
          <img
            src="/path/to/your/image.png"
            alt="Blueprint preview"
            className="rounded-xl border border-gray-200"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TwitterSegment;
