"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchemaType } from "../_schemas/profileSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PrimaryButton from "@/components/PrimaryButton";
import { useProfileStore } from "@/stores/useProfileStore";


export default function PerfilFormClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      cnpj: "",
      birthDate: "",
      phone: "",
      email: "",
      establishmentName: "",
      establishmentPhone: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      specialties: [],
      bio: "",
      avatar: "",
      equipe: [],
    },
  });
  const { setProfile, setError, setLoading: setStoreLoading , loading} = useProfileStore();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "specialties",
  });

  const MAX_SPECIALTIES = 3;
  const bio = watch("bio") || "";
  const avatar = watch("avatar") || "";

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  function handleAvatarUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    
    if (!url) {
      return; // Campo vazio, permite
    }

    if (!isValidUrl(url)) {
      toast.error("URL inválida. Digite uma URL completa (ex: https://...)", {
        position: "top-center",
      });
      e.target.value = "";
      return;
    }

  }


  async function onSubmit(data: ProfileSchemaType) {
    setStoreLoading(true);
    try {
      // ✅ Validar se tem avatar URL
      if (data.avatar && !isValidUrl(data.avatar)) {
        toast.error("URL do avatar inválida", { position: "top-center" });
        setStoreLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const res = await fetch("/api/perfil", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        setProfile(data);

        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Erro");
        toast.success("Perfil atualizado com sucesso", {
          position: "top-center",
        });
      } catch (err: any) {
        setError(err?.message || "Erro ao atualizar perfil");
        if (err?.name === "AbortError") {
          toast.error("Tempo de conexão excedido", { position: "top-center" });
        } else {
          console.error(err);
          toast.error("Erro ao atualizar perfil", { position: "top-center" });
        }
      } finally {
        setStoreLoading(false);
        clearTimeout(timeoutId);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao atualizar perfil", { position: "top-center" });
    } finally {
      setStoreLoading(false);
    }
  }


  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <div className="flex gap-6 items-center">
          <div className="w-28 h-28 rounded-md bg-amber-500 flex items-center justify-center text-2xl font-bold text-stone-900">
            {avatar && isValidUrl(avatar) ? (
              <img
                src={avatar}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
                onError={() => {
                  toast.error("Erro ao carregar imagem. URL inválida?", {
                    position: "top-center",
                  });
                }}
              />
            ) : (
              "JS"
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium text-white mb-1">
              Foto de Perfil
            </h2>
            <p className="text-sm text-stone-300 mb-4">
              Cole a URL de uma imagem (JPG, PNG, WEBP).
              Exemplo: https://example.com/minha-foto.jpg
            </p>
            <div className="flex items-center gap-3">
              <Input
                {...register("avatar")}
                placeholder="https://example.com/foto.jpg"
                className="bg-stone-500/50"
                onChange={handleAvatarUrlChange}
              />
              {avatar && (
                <PrimaryButton
                  type="button"
                  className="py-2 px-4 bg-stone-700"
                  onClick={() => {
                    // Limpar o campo avatar
                    const form = document.querySelector('form');
                    if (form) {
                      form.reset();
                    }
                  }}
                >
                  Limpar
                </PrimaryButton>
              )}
            </div>
            {errors.avatar && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.avatar.message as string}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-4">
          Dados Pessoais
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("name")}
              placeholder="Nome completo"
              className="bg-stone-500/50"
            />
            {errors.name && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("cnpj")}
              placeholder="CNPJ"
              className="bg-stone-500/50"
            />
            {errors.cnpj && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.cnpj.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("birthDate")}
              placeholder="Data de nascimento"
              className="bg-stone-500/50"
            />
            {errors.birthDate && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.birthDate.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("phone")}
              placeholder="Telefone pessoal"
              className="bg-stone-500/50"
            />
            {errors.phone && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.phone.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              placeholder="E-mail"
              className="bg-stone-500/50"
            />
            {errors.email && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-4">
          Estabelecimento
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("establishmentName")}
              placeholder="Nome do estabelecimento"
              className="bg-stone-500/50"
            />
            {errors.establishmentName && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.establishmentName.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("establishmentPhone")}
              placeholder="Telefone do estabelecimento"
              className="bg-stone-500/50"
            />
            {errors.establishmentPhone && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.establishmentPhone.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("cep")}
              placeholder="CEP"
              className="bg-stone-500/50"
            />
            {errors.cep && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.cep.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("address")}
              placeholder="Logradouro"
              className="bg-stone-500/50"
            />
            {errors.address && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.address.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("number")}
              placeholder="Número"
              className="bg-stone-500/50"
            />
            {errors.number && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.number.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("complement")}
              placeholder="Complemento"
              className="bg-stone-500/50"
            />
            {errors.complement && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.complement.message as string}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <div className="flex-1 mr-3">
        <h3 className="text-md font-semibold text-white mb-2">
          Serviços
        </h3>
        <p className="text-sm text-stone-300 mb-4">
          Adicione seus serviços. Eles aparecem no seu perfil público.
        </p>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-wrap gap-3 mb-2 items-center">
            <Input
              {...register(`specialties.${index}.servico`)}
              placeholder="Serviço (ex: Corte degradê)"
              className="bg-stone-500/50 w-50"
            />
            <Input
              {...register(`specialties.${index}.duracao`)}
              placeholder="Duração (min)"
              className="bg-stone-500/50 w-50"
            />
            <PrimaryButton
              type="button"
              className="py-1 px-3 bg-red-500"
              onClick={() => remove(index)}
            >
              Remover
            </PrimaryButton>
          </div>
          
        ))}
        {fields.length < MAX_SPECIALTIES ? (
          <PrimaryButton
            type="button"
            className="py-1 px-3 bg-green-500"
            onClick={() => append({ servico: "", duracao: "" })}
          >
            Adicionar
          </PrimaryButton>
        ) : (
          <div className="text-sm text-stone-400 mt-2">
            Limite de {MAX_SPECIALTIES} especialidades atingido
          </div>
        )}
        </div>
        <div className="flex-1 flex-col flex-wrap gap-3 items-center">
          <h3 className="text-md font-semibold text-white mb-2">Equipe</h3>
          <p className="text-sm w-50 text-stone-300">
            Se você tem uma equipe, pode buscar seus Barbeiro caso eles tenham perfil na plataforma.
          </p>
          <div className="flex-1  gap-3 mt-4">
          <Input type="search" placeholder="Buscar barbeiros..." className="bg-stone-500/50 w-50 mr-5" />
          <PrimaryButton type="button" className="mt-2 py-1 px-3 bg-blue-500">
            Buscar
          </PrimaryButton>
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-2">Sobre mim</h3>
        <label className="text-sm text-stone-300 mb-2 block">
          Descrição / Bio
        </label>
        <Textarea
          {...register("bio")}
          placeholder="Conte um pouco sobre você, sua experiência, diferenciais..."
          rows={6}
          className="bg-stone-500/50"
        />
        <div className="text-right text-sm text-stone-400 mt-2">
          {bio.length} / 500 caracteres
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <PrimaryButton
          type="submit"
          disabled={loading}
          className="w-1/2 py-3 bg-amber-500"
        >
          {loading ? "Salvando..." : "Salvar Perfil"}
        </PrimaryButton>
      </div>
    </form>
  );
}
