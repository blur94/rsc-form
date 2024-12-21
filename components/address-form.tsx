"use client";

import { useActionState } from "react";
import { submitAddress } from "@/actions/address";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ActionResponse, AddressFormData } from "@/types/address";
import { CheckCircle2 } from "lucide-react";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function AddressForm() {
  const [state, action, isPending] = useActionState(
    submitAddress,
    initialState
  );

  const getValue = (
    obj: "errors" | "inputs",
    field: keyof AddressFormData
  ): string => state?.[obj]?.[field] || "";

  return (
    <Card className="w-full max-w-lg mx-auto my-auto">
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
        <CardDescription>
          Please enter your shipping address details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                placeholder="123 Main St"
                defaultValue={getValue("inputs", "streetAddress")}
                // required
                // minLength={5}
                // maxLength={100}
                autoComplete="street-address"
                aria-describedby="streetAddress-error"
                className={
                  getValue("errors", "streetAddress") ? "'border-red-500'" : ""
                }
              />

              <Error
                message={getValue("errors", "streetAddress")}
                field="streetAddress"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                defaultValue={getValue("inputs", "apartment")}
                placeholder="Apt 4B"
                // maxLength={20}
                autoComplete="address-line2"
                aria-describedby="apartment-error"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={getValue("inputs", "city")}
                  placeholder="New York"
                  // required
                  // minLength={2}
                  // maxLength={50}
                  autoComplete="address-level2"
                  aria-describedby="city-error"
                  className={
                    getValue("errors", "city") ? "border-red-500" : "''"
                  }
                />

                <Error message={getValue("errors", "city")} field="city" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={getValue("inputs", "state")}
                  placeholder="NY"
                  // required
                  // minLength={2}
                  // maxLength={50}
                  autoComplete="address-level1"
                  aria-describedby="state-error"
                  className={
                    getValue("errors", "state") ? "border-red-500" : "''"
                  }
                />
                <Error message={getValue("errors", "state")} field="state" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  defaultValue={getValue("inputs", "zipCode")}
                  placeholder="10001"
                  // required
                  // pattern="[0-9]{5}(-[0-9]{4})?"
                  // maxLength={10}
                  autoComplete="postal-code"
                  aria-describedby="zipCode-error"
                  className={
                    getValue("errors", "zipCode") ? "'border-red-500'" : ""
                  }
                />
                <Error
                  message={getValue("errors", "zipCode")}
                  field="zipCode"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={getValue("inputs", "country")}
                  placeholder="United States"
                  // required
                  // minLength={2}
                  // maxLength={56}
                  autoComplete="country-name"
                  aria-describedby="country-error"
                  className={
                    getValue("errors", "country") ? "'border-red-500'" : ""
                  }
                />
                <Error
                  message={getValue("errors", "country")}
                  field="country"
                />
              </div>
            </div>
          </div>

          {state?.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface ErrorProps {
  message: string;
  field: keyof AddressFormData;
}

const Error = ({ message, field }: ErrorProps) => {
  return message ? (
    <p id={`${field}-error`} className="text-sm text-red-500">
      {message}
    </p>
  ) : null;
};
